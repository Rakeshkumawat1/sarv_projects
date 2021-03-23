var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error, connection) {
    if(error){
        throw error;
    }
    connection.createChannel(function(error1, channel) {
        if(error1){
            throw error1;
        }
        var queue = 'TestQueue';
        var msg = 'Hello Rakesh';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log("[x] sent %s", msg);
    });

    setTimeout(function(){
        connection.close();
        process.exit(0)
    }, 500);
});