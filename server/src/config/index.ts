import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: string | undefined;
    mongodbName: string;
    mongodbPassword: string;
}

const config: Partial<Config> = {
    port: process.env.PORT,
    mongodbName: process.env.MONGODB_NAME,
    mongodbPassword: process.env.MONGODB_ADMIN_PASSWORD,
}

export default config