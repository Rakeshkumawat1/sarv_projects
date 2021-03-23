const express = require('express');
const { smsCampaign } = require('../controllers/sms_campaign');
const router = express.Router();

router.post('/sms_campaign', smsCampaign);

module.exports = router;