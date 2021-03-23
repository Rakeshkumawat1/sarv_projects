const express = require('express');
const { sendMessage } = require('../controllers/send_message');
const { validateSendMessageRequest, isRequestValidate } = require('../validation/send_message_validate');
const router = express.Router();

router.post('/sendmessage',validateSendMessageRequest,isRequestValidate, sendMessage);

module.exports = router;