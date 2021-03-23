var express = require('express');
var router = express.Router();
const cluster = require('cluster');

const Webhook = require('../models/webhook');
const redis = require('redis');
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  cluster.worker.kill();
});

router.get('/mtest', (req,res) => {
  console.time('default');
  Webhook.find({}).select({processed:1}).lean()
  .exec((error, result) => {
    console.timeEnd('default')
      if (error) return res.status(400).json({ error });
      if (result) {
          res.status(200).json({
              result,
              message: "cache miss"
          });
      }
  })
})

module.exports = router;
