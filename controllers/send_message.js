var amqp = require('amqplib/callback_api');

exports.sendMessage = (req, res) => {
    const { message } = req.body;
    const amqp_url = process.env.AMQB_URL;
    amqp.connect(amqp_url, function (error, connection) {
        if (error) {
            throw error;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'TestQueue';
            var msg = message;

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log("[x] sent %s", msg);
        });

        setTimeout(function () {
            connection.close();
           // process.exit(0)
        }, 500);
        res.status(200).json({ message:'Message added to Queue!'});
    });
}