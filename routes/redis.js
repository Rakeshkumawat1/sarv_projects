const express = require('express');
const { redisTest } = require('../controllers/redis');
const router = express.Router();

router.get('/redis', redisTest);

module.exports = router;