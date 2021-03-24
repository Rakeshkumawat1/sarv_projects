const mongoose = require('mongoose');
const Webhook = require('./models/webhook');
const env = require('dotenv');
const axios = require('axios');

env.config();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.0rsnr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log("database connected");
    if (!this.instance) {
        console.log("creating new WebhookQueue instance");
        this.instance = new WebhookQueue();
    } else {
        console.log("WebhookQueue instance already exists");
    }
})


// mongoose.connection.on('connected', () => {
//     console.log("connected");
//     if (!this.instance) {
//         console.log("creating new WebhookQueue instance");
//         this.instance = new WebhookQueue();
//     } else {
//         console.log("WebhookQueue instance already exists");
//     }
// });
//test git comment

const WebhookQueue = function () {
    const self = this;

    self.checkHooksInterval = 5000;
    setTimeout(self.checkHooks.bind(self), self.checkHooksInterval);
}

const pt = WebhookQueue.prototype;


pt.checkHooks = function () {
    const self = this;
    console.log("** Checking Webhook Queue ***")
    Webhook.find({ processed: false })
        .limit(10)
        .exec()
        .then(async function (webhooks) {
            if (webhooks.length) {
                console.log("Pending Webhooks Found");
                // Process the webhooks and mark them processed: true
                //console.log(webhooks)
                //console.log(JSON.stringify({webhooks}));
                const datatype = JSON.stringify({webhooks});
                //console.log(webhooks[0].notificationType)
                if (webhooks[0].notificationType === 'sendmessage') {
                    const payload = webhooks[0].bodyData;
                    await axios.post('http://localhost:4000/api/sendmessage',{...payload})
                        .then(response => {
                           console.log(response.data);
                        })
                }
                setTimeout(self.checkHooks.bind(self), self.checkHooksInterval);
            }
        })
        .catch(function (err) {
            console.log("something went wrong", err);
            setTimeout(self.checkHooks.bind(self), self.checkHooksInterval);
        })
}