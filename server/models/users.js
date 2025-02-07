const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String },
    email: { type: String},
    country_code: { type: String },
    phone: { type: Number },
    profile_image_id: { type: Number},
    system_reserve: { type: String, default: "0" },
    status: { type: Number, default: 1 },
    created_by_id: { type: Number, default: 1 },
    email_verified_at: { type: Date, default: null },
    created_at: { type: Date,default: Date.now },
    updated_at: { type: Date,default: Date.now  },
    deleted_at: { type: Date, default: null },
    orders_count: { type: Number, default: 8 },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    store: { type: mongoose.Schema.Types.Mixed, default: null },
    point: { type: mongoose.Schema.Types.ObjectId, ref: 'Point' },
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    vendor_wallet: { type: mongoose.Schema.Types.Mixed, default: null },
    profile_image: { type: mongoose.Schema.Types.ObjectId, ref: 'ProfileImage' },
    payment_account: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentAccount' }
});

module.exports = mongoose.model('User', UserSchema, 'users');
