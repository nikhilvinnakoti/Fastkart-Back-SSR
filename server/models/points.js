const mongoose = require('mongoose');


const PointSchema = new mongoose.Schema({
    
    consumer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    balance: { type: Number, default: 300 }
});

module.exports = mongoose.model('Point', PointSchema, 'points');

