import * as winston from 'winston';
import { ENVIRONMENT } from './secrets';

const logger = winston.createLogger({
  format: winston.format.json(),
  level: 'info',
  transports: [
    new winston.transports.Console({ level: ENVIRONMENT === 'production' ? 'error' : 'debug' }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
  ],
});

if (ENVIRONMENT !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
