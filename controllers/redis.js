const Webhook = require('../models/webhook');
const redis = require('redis');
const axios = require('axios');

exports.redisTest = async (req, res) => {

    const client = redis.createClient({});
    client.on('error', err => {
        console.log(err);
    });

    try {
        client.get('rediswebhook', async (err, result) => {
            if (err) throw err;
            if (result) {
                res.status(200).send({
                    result: JSON.parse(result),
                    message: "data retrieved from the cache"
                });
            } else {
                Webhook.find({})
                    .exec((error, result) => {
                        if (error) return res.status(400).json({ error });
                        if (result) {
                            client.setex('rediswebhook', 60, JSON.stringify(result));
                            res.status(200).json({
                                result,
                                message: "cache miss"
                            });
                        }
                    })
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }


}