import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  url: String,
  scrapedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
