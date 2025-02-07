const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    _id: { type: Number},
    consumer_id: { type: Number},
    balance: { type: Number, default: 84.4 }
});

module.exports = mongoose.model('Wallet', WalletSchema, 'wallets');

