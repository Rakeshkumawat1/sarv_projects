const SmsCampaign = require('../models/sms_campaign');
const axios = require('axios');
const qs = require('qs');

exports.smsCampaign = (req, res) => {
    const { token, user_id, route, template_id, sender_id, language, template, contact_numbers } = req.body;
    const payload = {
        token, user_id, route, template_id,
        sender_id, language, template, contact_numbers
    }
    SmsCampaign.findOne({user_id: user_id})
        .exec(async(error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                console.log('2')
                await axios.post('http://m1.sarv.com/api/v2.0/sms_campaign.php', qs.stringify({ ...payload }))
                    .then((res) => {
                        console.log(res.data);
                    }).catch((error) => {
                        console.error(error);
                    });
            } else {
                const smscampaign = new SmsCampaign({
                    user_id: user_id,
                    route: route,
                    template_id: template_id,
                    sender_id: sender_id,
                    language: language,
                    template: template,
                    contact_numbers: contact_numbers
                })
                smscampaign.save(async (error, smscampaign) => {
                    if (error) return res.status(400).json({ error });
                    if (smscampaign) {
                        await axios.post('http://m1.sarv.com/api/v2.0/sms_campaign.php', qs.stringify({ ...payload }))
                            .then((res) => {
                                console.log(res.data);
                            }).catch((error) => {
                                console.error(error);
                            });
                    }
                })
            }
        })
}