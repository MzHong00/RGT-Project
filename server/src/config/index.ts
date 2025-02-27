import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: string | undefined;
  allowClientUrl: string | undefined;
  mongodbName: string | undefined;
  mongodbPassword: string | undefined;
}

const config: Partial<Config> = {
  port: process.env.PORT,
  allowClientUrl: process.env.ALLOW_CLIENT_URL,
  mongodbName: process.env.MONGODB_NAME,
  mongodbPassword: process.env.MONGODB_ADMIN_PASSWORD,
};

export default config;
