const mongoose = require('mongoose');

const ProfileImageSchema = new mongoose.Schema({
    name: { type: String, index: true, default: "default_profile" }, // Index for image name searches
    file_name: { type: String, default: "default.jpg" },
    created_by_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProfileImage', ProfileImageSchema, 'profile_images');
