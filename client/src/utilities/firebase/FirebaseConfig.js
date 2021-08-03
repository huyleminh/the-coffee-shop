import firebase from "firebase/app";
import "firebase/storage";
import { FirebaseEnvironmentConst as FBConst } from "../../shared/EnvironmentConst";

const firebaseConfig = {
    apiKey: FBConst.API_KEY,
    authDomain: FBConst.AUTH_DOMAIN,
    projectId: FBConst.PROJECT_ID,
    storageBucket: FBConst.STORAGE_BUCKET,
    messagingSenderId: FBConst.MESSAGIN_SENDER_ID,
    appId: FBConst.APP_ID,
    measurementId: FBConst.MEASUREMENT_ID,
};

const AppFirebase = firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const Storage = firebase.storage();

export { Storage, AppFirebase as default };
