const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    street: { type: String },
    city: { type: String },
    pincode: { type: String },
    country_code: { type: String },
    phone: { type: Number },
    country_id: { type: Number},
    state_id: { type: Number },
    country: {
        id: { type: Number },
        name: { type: String }
    },
    state: {
        id: { type: Number},
        name: { type: String  },
        country_id: { type: Number }
    }
});

module.exports = mongoose.model('Address', AddressSchema, 'addresses');

