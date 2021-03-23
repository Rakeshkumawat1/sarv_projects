const express = require('express');
const { receiveMessage } = require('../controllers/receive_message');
const router = express.Router();

router.post('/receive_message', receiveMessage);

module.exports = router;