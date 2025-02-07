const UserAccountSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, index: true },  // Index for faster name searches
    email: { type: String, unique: true, index: true }, // Unique index for email
    country_code: String,
    phone: { type: Number, index: true }, // Index for faster phone number lookups
    profile_image_id: String,
    status: { type: Number, index: true }, // Index for quick filtering by status
    created_by_id: Number,
    created_at: { type: Date, default: Date.now, index: true }, // Index for sorting by creation date
    updated_at: { type: Date, default: Date.now  },
    deleted_at: { type: Date, default: null },
    orders_count: Number,
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    point: { type: mongoose.Schema.Types.ObjectId, ref: 'Point' },
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    profile_image: { type: mongoose.Schema.Types.ObjectId, ref: 'ProfileImage' },
    payment_account: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentAccount' }
});

// Compound index for faster search on email & phone together
UserAccountSchema.index({ email: 1, phone: 1 });

module.exports = mongoose.model('UsersAccount', UserAccountSchema, 'users-account');
