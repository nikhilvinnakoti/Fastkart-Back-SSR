const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    _id: Number,
    title: { type: String, required: true },
    user_id: { type: Number},
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    is_default: { type: Number, default: 0 },
    country_code: { type: String },
    phone: { type: Number, required: true },
    country_id: { type: SVGAnimatedNumberList},
    state_id: { type: Number, required: true },
    country: {
        id: { type: Number },
        name: { type: String }
    },
    state: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        country_id: { type: Number }
    }
});

module.exports = mongoose.model('Address', AddressSchema, 'addresses');

