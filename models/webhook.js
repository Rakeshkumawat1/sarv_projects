const mongoose = require('mongoose');

const WebhookSchema = new mongoose.Schema({
  accountId: { type: String, index: true },
  bodyData: { type: String, index: true,trim: true},
  baseUrl: { type: String, index: true},
  notificationType: { type: String, index: true },
  receivedAt: { type: Date, default: Date.now, index: true, expires: '14d' },
  processed: { type: Boolean, index: true, default: false },
  processedAt: { type: Date }
  //more relevant fields related to the webhook 
});
module.exports = mongoose.model("Webhook", WebhookSchema); 