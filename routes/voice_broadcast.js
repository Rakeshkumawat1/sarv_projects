const express = require('express');
const { voiceBroadcase } = require('../controllers/voice_broadcast');
const router = express.Router();

router.post('/voicebroadcast', voiceBroadcase);

module.exports = router;
