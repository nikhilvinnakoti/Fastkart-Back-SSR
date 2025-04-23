const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  data: { type: Array, required: true }, // Array of categories
  total: { type: Number, required: true } // Total count
});

module.exports = mongoose.model('Category', CategorySchema, 'categories');

