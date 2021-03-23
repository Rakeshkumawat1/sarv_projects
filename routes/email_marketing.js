const express = require('express');
const { emailMarketing } = require('../controllers/email_marketing');
const router = express.Router();

router.post('/email_marketing', emailMarketing)

module.exports = router;