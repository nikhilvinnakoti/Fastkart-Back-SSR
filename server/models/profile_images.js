const ProfileImageSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, index: true }, // Index for image name searches
    file_name: String,
    created_by_id: Number,
    created_at: Date
});

module.exports = mongoose.model('ProfileImage', ProfileImageSchema, 'profile_images');
