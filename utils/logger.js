const { createLogger, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({ timestamp, level, message, stack }) => {
      if (stack) {
        return `[${timestamp}] [${level.toUpperCase()}]: ${message}\n${stack}`;
      }
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    //new transports.Console(),
    new DailyRotateFile({
      filename: 'Storage/logs/movieApp-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
});

module.exports = logger;
