import * as dotenv from 'dotenv';
import * as fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.debug('No .env file found.');
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const MONGODB_URI = prod ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL;

if (!SESSION_SECRET) {
  logger.error('No client secret. Set SESSION_SECRET environment variable.');
  process.exit(1);
}

if (!MONGODB_URI) {
  logger.error('No mongo connection string. Set MONGODB_URI environment variable.');
  process.exit(1);
}
