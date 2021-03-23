var amqp = require('amqplib/callback_api');

exports.receiveMessage = (req, res) => {

    amqp.connect('amqp://localhost', function (error, connection) {
        if (error) {
            throw error;
        }
        connection.createChannel(function (error1, channel) {
            if (error) {
                throw error1;
            }

            var queue = "TestQueue";
            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for message in %s. To exit press CTRL+C", queue);
            channel.consume(queue, function (msg) {
                console.log(" [x] Received %s", msg.content.toString());
            }, {
                noAck: true
            });
        });
    });
}