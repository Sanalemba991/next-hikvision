import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google users
  firstName: String,
  lastName: String,
  company: String,
  phone: String, // Added phone field
  image: String,
  emailVerified: Date,
  role: { type: String, default: 'USER' },
  isActive: { type: Boolean, default: true },
  provider: { type: String, default: 'credentials' },
  providerId: String,
}, {
  timestamps: true
})

export default mongoose.models.User || mongoose.model('User', UserSchema)