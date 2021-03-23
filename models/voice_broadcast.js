const mongoose = require('mongoose');
const voiceBroadcastSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    plan_id: {
        type: Number,
        required: true
    },
    announcement_id: {
        type: Number,
        required: true
    },
    caller_id: {
        type: Number,
        required: true
    },
    contact_numbers: {
        type: Number,
        required: true
    },
    retry_json: {
        type: String,
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('VoiceBroadcast', voiceBroadcastSchema);