import * as winston from 'winston';

const formatter = winston.format.printf((info) => {
  return `${info.timestamp} [${info.level}] ${info.message}`;
});

const myFormat = winston.format.combine(
  winston.format.timestamp(),
  formatter,
);

const logger = winston.createLogger({
  format: myFormat,
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
      level: 'info',
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: myFormat,
  }));
}

export default logger;
