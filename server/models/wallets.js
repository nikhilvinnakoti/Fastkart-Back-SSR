const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    consumer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    balance: { type: Number, default: 84.4 }
});

module.exports = mongoose.model('Wallet', WalletSchema, 'wallets');

