var express = require('express');
var router = express.Router();
const cluster = require('cluster');

const Aggregation = require('../models/aggregation');
const redis = require('redis');
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  cluster.worker.kill();
});

router.post('/mtest', async (req,res) => {

  console.time('default');
  Aggregation.aggregate([
    { "$match" : 
      { "processed" : false
      }
    },
    { "$project" : 
      { "processed" : 1, 
        "_id" : 0, 
        "bodyData" : 1 
      }
    }
  ])
  .exec((error, result) => {
    console.timeEnd('default')
      if (error) return res.status(400).json({ error });
      if (result) {
        console.log(result)
          res.status(200).json({
              message: "cache miss"
          });
      }
  })

  // const aggregation = new Aggregation({
  //   accountId: 'test',
  // bodyData: 'testdata',
  // notificationType: 'testnotification',
  // })

  //   await aggregation.save((error, result) => {
  //     if(error) return res.status(400).json({error});
  //     if(result){
  //       res.status(200).json({
  //         result
  //       })
  //     }
  //   })

  // console.time('default');
  // Webhook.find({}).select({processed:1}).lean()
  // .exec((error, result) => {
  //   console.timeEnd('default')
  //     if (error) return res.status(400).json({ error });
  //     if (result) {
  //         res.status(200).json({
  //             result,
  //             message: "cache miss"
  //         });
  //     }
  // })
})

module.exports = router;
