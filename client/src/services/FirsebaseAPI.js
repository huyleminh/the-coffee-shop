import { Storage } from "../utilities/firebase/FirebaseConfig";

class FirebaseAPI {
    static getImageURL = (name) => {
        return new Promise((resolve, reject) => {
            if (!name) {
                reject({ status: 400, error: "Missing image's name." });
                return;
            }

            const ref = Storage.ref(`/products/${name}`).getDownloadURL();
            ref.then((url) => {
                resolve({ status: 200, data: url });
            }).catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                reject({ status: 400, error: error.code });
            });
        });
    };

    static uploadImage = (image, name) => {
        return new Promise((resolve, reject) => {
            if (!image || !name) reject({ status: 400, error: "Missing file or file name." });

            const ref = Storage.ref(`/products/${name}`).put(image);
            ref.then((res) => resolve({ status: 200, data: res })).catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                reject({ status: 400, error: error.code });
            });
        });
    };

    static deleteImage = (name) => {
        return new Promise((resolve, reject) => {
            if (!name) reject({ status: 400, error: "Missing image's name." });

            const ref = Storage.ref(`/products/${name}`).delete();
            ref.then(() => resolve({ status: 200 })).catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                reject({ status: 400, error: error.code });
            });
        });
    };
}

export default FirebaseAPI;
