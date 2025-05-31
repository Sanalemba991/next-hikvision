import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await dbConnect()

        const user = await User.findOne({
          email: credentials.email
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
 callbacks: {
  async signIn({ user, account, profile }) {
    if (account?.provider === 'google') {
      await dbConnect()
      
      // Check if user exists
      const existingUser = await User.findOne({ email: user.email })
      
      if (!existingUser) {
        // Create new user for Google sign-in
        const googleProfile = profile as any;
        console.log('Creating new Google user with image:', user.image);
        
        await User.create({
          name: user.name,
          firstName: googleProfile?.given_name || '',
          lastName: googleProfile?.family_name || '',
          email: user.email,
          image: user.image, // Make sure this is saved
          provider: 'google',
          providerId: account.providerAccountId,
        })
      } else {
        // Update existing user's image
        console.log('Updating existing user image from:', existingUser.image, 'to:', user.image);
        
        await User.findByIdAndUpdate(existingUser._id, {
          image: user.image,
          firstName: (profile as any)?.given_name || existingUser.firstName,
          lastName: (profile as any)?.family_name || existingUser.lastName,
        });
      }
    }
    return true
  },
  async jwt({ token, user, account, profile }) {
    if (user) {
      token.id = user.id
      token.image = user.image
    }
    return token
  },
  async session({ session, token }) {
    if (token && session.user) {
      session.user.id = token.id as string
      session.user.image = token.image as string
    }
    return session
  },
},
  pages: {
    signIn: '/signup',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }