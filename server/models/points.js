const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    _id: { type: Number, default: 3 },
    consumer_id: { type: Number, default: 19 },
    balance: { type: Number, default: 300 }
});

module.exports = mongoose.model('Point', PointSchema, 'points');

