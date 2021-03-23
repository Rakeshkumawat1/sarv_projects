var winston = require('winston');
const path = require('path');
const transports = [];
require('winston-daily-rotate-file');

transports.push(
  new winston.transports.DailyRotateFile({
    name: 'file',
    datePattern: '.yyyy-MM-DDTHH-mm',
    filename: path.join(__dirname, '../logs', 'log_file'),
    prepend: true,
    zippedArchive: true,
    level: 'info',
    colorize: true,
    timestamp: function () {
      return (new Date()).toLocaleTimeString();
    }
  }),
)

var logger = new winston.createLogger({ transports: transports })

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

dataLog(0)
function dataLog(secondsPassed) {
  setTimeout(function () {
    if (dataLog != 300) {
      dataLog(++secondsPassed);
    }
  }, 1000);
}

module.exports = logger;