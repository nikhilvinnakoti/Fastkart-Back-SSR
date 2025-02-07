const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    _id: { type: Number, default: 2 },
    name: { type: String, default: "consumer" },
    guard_name: { type: String, default: "web" },
    system_reserve: { type: String, default: "1" },
    created_at: { type: Date, default: "2023-08-24T08:16:03.000000Z" },
    updated_at: { type: Date, default: "2023-08-24T08:16:03.000000Z" }
});

module.exports = mongoose.model('Role', RoleSchema, 'roles');
