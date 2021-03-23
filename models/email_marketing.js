const mongoose = require('mongoose');
const emailMarketingSchema = new mongoose.Schema({
    owner_id: {
        type: String,
        required: true,
        trim: true
    },
    smtp_user_name: {
        type: String,
        required: true,
        trim: true
    },
    to: {
        type: String,
        required: true,
        trim: true
    },
    html: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    from_email: {
        type: String,
        required: true,
        trim: true
    },
    from_name: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('EmailMarketing', emailMarketingSchema);