import mongoose from 'mongoose'

const ContactEnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  company: {
    type: String,
    trim: true,
    default: ''
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'responded', 'closed'],
    default: 'pending'
  }
}, {
  timestamps: true
})

// Create indexes for better query performance
ContactEnquirySchema.index({ status: 1 })
ContactEnquirySchema.index({ subject: 1 })
ContactEnquirySchema.index({ createdAt: -1 })

export const ContactEnquiry = mongoose.models.ContactEnquiry || mongoose.model('ContactEnquiry', ContactEnquirySchema)
export default ContactEnquiry