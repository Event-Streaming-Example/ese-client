import dotenv from 'dotenv';

dotenv.config();
export const SERVER_IP = process.env.REACT_APP_SERVER_IP

export const BUFFERED_STORAGE_LIMIT = 5
export const BUFFERED_PUSH_ENABLED = false