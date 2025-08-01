import dotenv from 'dotenv';
import path from 'path';

export const loadEnv = () => {
    const env = process.env.NODE_ENV || 'development';
    const envPath = path.resolve(process.cwd(), `.env.${env}`);

    dotenv.config({ path: envPath });
};

export const get = (key: string): string => {
    return process.env[key] || '';
};
