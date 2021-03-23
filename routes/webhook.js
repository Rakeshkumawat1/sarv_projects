var WebHooks = require('node-webhooks');
const express = require('express');
const router = express.Router();
const Webhook = require('../models/webhook')
const axios = require('axios');

// router.post('/webhook', (req, res) => {
//   // const webhooks = req.body.webhooks.map((w)=>{
//   //   return {
//   //     notificationType: w.type,
//   //     accountId: w.accountId
//   //   };
//   // });

//   // const { webhooks } = req.body;
//   // let allwebhooks = [];
//   // webhooks.forEach(function(w){
//   //     allwebhooks.push(
//   //             notificationType = w.type,
//   //             accountId = w.accountId
//   //     );
//   // })
//   const { type, accountId } = req.body;

//   if(req.body.message){
//     const webhooks = {
//       notificationType: type,
//       accountId: accountId,
//       bodyData: `{"message": "${req.body.message}"}`
//     };
//     Webhook.create(webhooks, async function (err) {
//       if (err) {
//         console.log(err);
//         return res.status(500).end();
//       }
//       else {
//         return res.status(200).end();
//         // if (req.body.message) {
//         //   const { message } = req.body;
//         //   await axios.post('http://localhost:4000/api/sendmessage', { message: message })
//         //     .then( response => {
//         //       console.log(response.data);
//         //     })
//         // }
//         // return res.status(200).end();
//       }
//     })
//   }else{
//     const webhooks = {
//       notificationType: type,
//       accountId: accountId
//     };
//     Webhook.create(webhooks, async function (err) {
//       if (err) {
//         console.log(err);
//         return res.status(500).end();
//       }
//       else {
//         return res.status(200).end();
//       }
//     })
//   }
//   // const webhooks = {
//   //   notificationType: type,
//   //   accountId: accountId
//   // };

//   // Webhook.create(webhooks, async function (err) {
//   //   if (err) {
//   //     console.log(err);
//   //     return res.status(500).end();
//   //   }
//   //   else {
//   //     if (req.body.message) {
//   //       const { message } = req.body;
//   //       await axios.post('http://localhost:4000/api/sendmessage', { message: message })
//   //         .then( response => {
//   //           // res.send('done');
//   //           console.log(response.data);
//   //         })
//   //       //console.log(response);
//   //     }
//   //     return res.status(200).end();
//   //   }
//   // })

// });

router.post('/webhook', async (req, res) => {

  var webHooks = new WebHooks({
    db: './webHooksDB.json',
    httpSuccessCodes: [200, 201, 202, 203, 204],
    DEBUG: true
  })
  if (req.body) {
    if (req.body.message) {
      const { message } = req.body;
      await webHooks.add('sendMessage', `http://localhost:4000/api/sendmessage {data = {${req.body.message}}}`)
        .then( (response) => {
          console.log(response.data)
          //res.writeHead(200, {'Content-Type': 'text/xml'});
          res.send('Message send successfully!');
        }).catch(function (err) {
          console.log(err)
        })

      webHooks.trigger('sendMessage', { message: message })

    } else if (req.body.username && req.body.plan_id && req.body.announcement_id &&
      req.body.caller_id && req.body.contact_numbers && req.body.retry_json) {
      const { username, plan_id, announcement_id, caller_id, contact_numbers, retry_json } = req.body;
      webHooks.add('voiceBroadcast', `http://localhost:4000/api/voicebroadcast`)
        .then(() => {
          res.send('done');
        }).catch(err => { console.log(err) });
      webHooks.trigger('voiceBroadcast', {
        username: username, plan_id: plan_id
        , announcement_id: announcement_id, caller_id: caller_id,
        contact_numbers: contact_numbers, retry_json: retry_json
      });
    }
  }
  else {
    console.log('no')
  }

  // webHooks = new WebHooks({
  //     db: {"addPost": ["http://localhost:4000/api/sendmessage"]},
  // })

})


module.exports = router;