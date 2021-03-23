const mongoose = require('mongoose');
const smsCampaignSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        trim: true
    },
    route: {
        type: String,
        required: true,
        trim: true
    },
    template_id: {
        type: String,
        required: true,
        trim: true
    },
    sender_id: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    template: {
        type: String,
        required: true,
        trim: true
    },
    contact_numbers:{
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('SmsCampaign', smsCampaignSchema);