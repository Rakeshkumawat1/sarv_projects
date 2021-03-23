var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const logger  = require('./helpers/logger');

env.config();


var indexRouter = require('./routes/index');
var voiceBroadcastRouter = require('./routes/voice_broadcast');
var sendMessageRouter = require('./routes/send_message');
var receiveMessageRouter = require('./routes/received_message');
var webHookRouter = require('./routes/webhook');
var redisRouter = require('./routes/redis');
var smsCampaignRouter = require('./routes/sms_campaign');
var emailMarketingRouter = require('./routes/email_marketing');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', voiceBroadcastRouter);
app.use('/api', sendMessageRouter);
app.use('/api', receiveMessageRouter);
app.use('/api', webHookRouter);
app.use('/api', redisRouter);
app.use('/api', smsCampaignRouter);
app.use('/api', emailMarketingRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

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
})

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.log('info',`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(`Worker is running on port ${process.pid}`);
  });
}

module.exports = app;
