const mongoose = require('mongoose');

const PaymentAccountSchema = new mongoose.Schema({
    
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Index for linking payments to users
    paypal_email: { type: String, sparse: true, index: true }, // Sparse index to allow null values
    bank_account_no: { type: String, sparse: true, index: true }
});

module.exports = mongoose.model('PaymentAccount', PaymentAccountSchema, 'payment_accounts');
