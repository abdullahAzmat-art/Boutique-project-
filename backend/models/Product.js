import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a product title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
  },
  discountPrice: {
    type: Number,
  },
  picture: {
    url: {
      type: String,
      required: [true, 'Please provide a picture URL'],
    },
    bucket: {
      type: String,
      required: [true, 'Please provide the Supabase bucket name'],
      default: 'Boutique-Product',
    }
  },
  whatsappNumber: {
    type: String,
    required: [true, 'Please provide a WhatsApp number for ordering'],
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
