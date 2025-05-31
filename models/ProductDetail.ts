import mongoose, { Document, Schema } from 'mongoose'

export interface IProductDetail extends Document {
  productId: mongoose.Types.ObjectId
  longDescription: string
  featureImages: Array<{
    image: string
    altText: string
  }>
  specifications: Array<{
    key: string
    value: string
  }>
  features: string[]
  reviews: Array<{
    customerName: string
    rating: number
    comment: string
    date: string
  }>
  seo: {
    focusKeyword: string
    title: string
    description: string
    keywords: string[]
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductDetailSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    unique: true // This is enough for uniqueness and creates an index
    // Removed: index: true (duplicate)
  },
  longDescription: {
    type: String,
    required: true,
    trim: true
  },
  featureImages: [{
    image: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      required: true,
      trim: true
    }
  }],
  specifications: [{
    key: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    }
  }],
  features: [{
    type: String,
    trim: true
  }],
  reviews: [{
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  seo: {
    focusKeyword: {
      type: String,
      required: true,
      trim: true
      // Removed: index: true (will create manually below)
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160
    },
    keywords: [{
      type: String,
      trim: true
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Create indexes manually (no duplicates now)
// ProductDetailSchema.index({ productId: 1 }) // Not needed - unique: true already creates this
ProductDetailSchema.index({ 'seo.focusKeyword': 1 })
ProductDetailSchema.index({ isActive: 1 })
ProductDetailSchema.index({ createdAt: -1 })

export default mongoose.models.ProductDetail || mongoose.model<IProductDetail>('ProductDetail', ProductDetailSchema)