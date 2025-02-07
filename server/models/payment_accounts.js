const PaymentAccountSchema = new mongoose.Schema({
    _id: Number,
    user_id: { type: Number, index: true }, // Index for linking payments to users
    paypal_email: { type: String, sparse: true, index: true }, // Sparse index to allow null values
    bank_account_no: { type: String, sparse: true, index: true }
});

module.exports = mongoose.model('PaymentAccount', PaymentAccountSchema, 'payment_accounts');
