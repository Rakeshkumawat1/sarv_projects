const slugify = require('slugify');
const VoiceBroadcast = require('../models/voice_broadcast');
const axios = require('axios');
const qs = require('qs');
const cluster = require('cluster');

exports.voiceBroadcase = (req, res) => {
    const { username, token, plan_id, announcement_id, caller_id, contact_numbers, retry_json } = req.body;
    VoiceBroadcast.findOne({ username: username })
        .exec(async (error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                const payload = {
                    username: username,
                    token: token,
                    plan_id: plan_id,
                    announcement_id: announcement_id,
                    caller_id: caller_id,
                    contact_numbers: contact_numbers,
                    retry_json: retry_json
                }

                const response = await axios.post('https://obd37.sarv.com/api/voice/voice_broadcast.php', qs.stringify({ ...payload }))
                    .then((res) => {
                        console.log(res.data);
                    }).catch((error) => {
                        console.error(error)
                    })
            } else {
                const voicebroadcast = new VoiceBroadcast({
                    username,
                    slug: slugify(username),
                    plan_id,
                    announcement_id,
                    caller_id,
                    contact_numbers,
                    retry_json
                })
                voicebroadcast.save(async (error, voicebroadcast) => {
                    if (error) return res.status(400).json({ error });
                    if (voicebroadcast) {
                        const payload = {
                            username: username,
                            token: token,
                            plan_id: plan_id,
                            announcement_id: announcement_id,
                            caller_id: caller_id,
                            contact_numbers: contact_numbers,
                            retry_json: retry_json
                        }

                        const response = await axios.post('https://obd37.sarv.com/api/voice/voice_broadcast.php', qs.stringify({ ...payload }))
                            .then((res) => {
                                console.log(res.data);
                            }).catch((error) => {
                                console.error(error)
                            })
                    }
                })
            }
        })
}