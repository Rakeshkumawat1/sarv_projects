const axios = require('axios');
const qs = require('qs');
const EmailMarketing = require('../models/email_marketing');
const request = require('request');

exports.emailMarketing = (req, res) => {
    const { to, smtp_user_name, html, subject, from_email, from_name, owner_id, token } = req.body;
    EmailMarketing.findOne({ owner_id: owner_id })
        .exec(async (error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                const url = 'https://api.sarvmail.net/v1.0/messages/sendMail';
                await axios.post(url, {"message":{"to":to,"html":html,"subject":subject,"from_email":from_email,"from_name":from_name},"owner_id":owner_id,"token":token,"smtp_user_name":smtp_user_name})
                    .then(response => {
                        if (response) {
                            console.log(response.data)
                        }
                    }).catch((error) => console.log(error));
            } else {
                const emailmarketing = new EmailMarketing({
                    owner_id,
                    smtp_user_name,
                    to,
                    html,
                    subject,
                    from_email,
                    from_name
                })
                emailmarketing.save(async (error, result) => {
                    if (error) return res.status(400).json({ error });
                    if (result) {
                        await axios.post('https://api.sarvmail.net/v1.0/messages/sendMail', 
                        {"message":{"to":to,"html":html,"subject":subject,"from_email":from_email,"from_name":from_name},"owner_id":owner_id,"token":token,"smtp_user_name":smtp_user_name})
                            .then(response => {
                                if (response) {
                                    res.status(200).json({ response });
                                }
                            }).catch((error) => console.log(error));
                    }
                })
            }
        })
}