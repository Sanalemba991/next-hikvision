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
    date: Date
  }>
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductDetailSchema = new Schema<IProductDetail>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    unique: true
  },
  longDescription: {
    type: String,
    required: true
  },
  featureImages: [{
    image: { type: String, required: true },
    altText: { type: String, required: true }
  }],
  specifications: [{
    key: { type: String, required: true },
    value: { type: String, required: true }
  }],
  features: [{ type: String }],
  reviews: [{
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
})

// Force delete the old model and create new one
delete mongoose.models.ProductDetail

export default mongoose.model<IProductDetail>('ProductDetail', ProductDetailSchema)