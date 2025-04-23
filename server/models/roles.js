const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, default: "consumer" },
    guard_name: { type: String, default: "web" },
    system_reserve: { type: String, default: "1" },
    created_at: { type: Date, default: Date.now  },
    updated_at: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('Role', RoleSchema, 'roles');
