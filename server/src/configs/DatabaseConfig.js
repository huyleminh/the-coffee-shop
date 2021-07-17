import dotenv from "dotenv";
dotenv.config();

export default class DatabaseConfig {
    static get CONFIG() {
        return {
            HOST: process.env.DATABASE_HOST_NAME,
            USER: process.env.DATABASE_USERNAME,
            PASSWORD: process.env.DATABASE_PASSWORD,
            DATABASE: process.env.DATABASE_NAME,
        };
    }
}
