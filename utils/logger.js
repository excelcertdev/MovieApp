const { createLogger, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

// Check if 'Storage/logs' directory exists
const logsDirectory = path.join(__dirname, 'Storage/logs');
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

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
    // new transports.Console(),
    new DailyRotateFile({
      filename: path.join(logsDirectory, 'movieApp-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
});

module.exports = logger;
