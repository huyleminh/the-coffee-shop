import dotenv from "dotenv";

dotenv.config();

export default class EnvironmentConst {
    static get API_DOMAIN() {
        return process.env.API_DOMAIN;
    }
}