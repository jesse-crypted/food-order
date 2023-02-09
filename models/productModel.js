const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a product must have a name'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, ' a product must have a price'],
  },
  img: { type: String, required: true },
  description: {
    type: String,
    required: [true, ' a product must have a description'],
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
