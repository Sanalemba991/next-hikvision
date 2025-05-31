import mongoose, { Document, Schema } from 'mongoose'

export interface IProductEnquiry extends Document {
  productId: mongoose.Types.ObjectId
  productName: string
  message: string
  userDetails: {
    userId?: mongoose.Types.ObjectId
    name: string
    email: string
    phone?: string
    company?: string
  }
  status: 'pending' | 'responded' | 'closed'
  createdAt: Date
  updatedAt: Date
}

const ProductEnquirySchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  userDetails: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    company: {
      type: String
    }
  },
  status: {
    type: String,
    enum: ['pending', 'responded', 'closed'],
    default: 'pending'
  }
}, {
  timestamps: true
})

export default mongoose.models.ProductEnquiry || mongoose.model<IProductEnquiry>('ProductEnquiry', ProductEnquirySchema)