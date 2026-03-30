const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  wholesalePrice: { type: Number, required: true },
  retailPrice: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  unit: { type: String, enum: ['kg', 'pcs', 'box', 'sachet'], default: 'pcs' },
  lowStockThreshold: { type: Number, default: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);