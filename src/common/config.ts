import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});
export const PORT = process.env['PORT'];

export const NODE_ENV = process.env['NODE_ENV'];
export const JWT_SECRET_KEY = process.env['JWT_SECRET_KEY'];
export const AUTH_MODE = process.env['AUTH_MODE'] === 'true';

export const POSTGRES_HOST = process.env['POSTGRES_HOST'];
export const POSTGRES_PORT = process.env['POSTGRES_PORT'] as number | undefined;
export const POSTGRES_USERNAME = process.env['POSTGRES_USERNAME'];
export const POSTGRES_PASSWORD = process.env['POSTGRES_PASSWORD'];
export const POSTGRES_DB = process.env['POSTGRES_DB'];
