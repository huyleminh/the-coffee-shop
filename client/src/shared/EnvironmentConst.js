import dotenv from "dotenv";

dotenv.config();

export default class EnvironmentConst {
    static get API_DOMAIN() {
        return process.env.API_DOMAIN;
    }
}

export class FirebaseEnvironmentConst {
    static get API_KEY() {
        return process.env.REACT_APP_FIREBASE_API_KEY;
    }

    static get AUTH_DOMAIN() {
        return process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
    }

    static get PROJECT_ID() {
        return process.env.REACT_APP_FIREBASE_PROJECT_ID;
    }

    static get STORAGE_BUCKET() {
        return process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
    }

    static get MESSAGIN_SENDER_ID() {
        return process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID;
    }

    static get APP_ID() {
        return process.env.REACT_APP_FIREBASE_APP_ID;
    }

    static get MEASUREMENT_ID() {
        return process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;
    }
}
