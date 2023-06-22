import dotenv from 'dotenv';
import ConfigInterface from '../interfaces/config.interface.js';

dotenv.config();

const config: ConfigInterface = {
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
    appDebug: !!process.env.APP_DEBUG,
    publicFolderUrl: process.env.PUBLIC_FOLDER_URL,
    secretKey: process.env.SECRET_KEY,
};

export default config;