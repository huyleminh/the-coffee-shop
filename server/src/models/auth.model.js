import DatabaseConnection from "../utilities/database/DatabaseConnection.js";
import DatabaseConfig from "../configs/DatabaseConfig.js";
import UserInfo from "../utilities/database/entities/UserInfo.js";
import UserLogin from "../utilities/database/entities/UserLogin.js";

class AuthModel {
    getAllUserId() {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT id FROM ${DatabaseConfig.CONFIG.DATABASE}.USER_LOGIN;`;

            DatabaseConnection.query(sqlQuery, (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (rows === undefined) {
                    reject(new Error("Error: 'rows' is undefined"));
                } else {
                    const jsonString = JSON.stringify(rows);
                    const jsonData = JSON.parse(jsonString);

                    resolve(jsonData);
                }
            });
        });
    }
    getUserLoginByUsername(username) {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.USER_LOGIN WHERE username = ?;`;

            DatabaseConnection.query(sqlQuery, username, (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (rows === undefined) {
                    reject(new Error("Error: 'rows' is undefined"));
                } else {
                    const userLoginList = UserLogin.toArrayFromDatabaseObject(rows);
                    resolve(userLoginList);
                }
            });
        });
    }

    getAllUserLogin() {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.USER_LOGIN`;

            DatabaseConnection.query(sqlQuery, (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (rows === undefined) {
                    reject(new Error("Error: 'rows' is undefined"));
                } else {
                    const userLoginList = UserLogin.toArrayFromDatabaseObject(rows);
                    resolve(userLoginList);
                }
            });
        });
    }

    getUserInfoByUsernameAndPhoneNumber(username, phoneNumber) {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT info.*
            FROM ${DatabaseConfig.CONFIG.DATABASE}.USER_LOGIN AS login
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.USER_INFO AS info
            ON login.id = info.id
            WHERE login.username = ? OR info.phoneNumber = ?`;

            DatabaseConnection.query(sqlQuery, [username, phoneNumber], (error, rows) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    if (rows === undefined) {
                        reject(new Error("Error: 'rows' is undefined"));
                    } else {
                        const userInfoList = UserInfo.toArrayFromDatabaseObject(rows);
                        resolve(userInfoList);
                    }
                }
            );
        });
    }

    getAllUserInfo() {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.USER_INFO`;

            DatabaseConnection.query(sqlQuery, (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (rows === undefined) {
                    reject(new Error("Error: 'rows' is undefined"));
                } else {
                    const userInfoList = UserInfo.toArrayFromDatabaseObject(rows);
                    resolve(userInfoList);
                }
            });
        });
    }

    insertUserInfo(userInfo) {
        return new Promise((resolve, reject) => {
            // (id, fullname, address, phoneNumber, gender, updatedAt, createdAt)
            const sqlQuery = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.USER_INFO
            VALUES (?, ?, ?, ?, ?, ?, ?);`; // fix ?b to ?, error can not find field b0

            DatabaseConnection.query(sqlQuery, Object.values(userInfo), (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve();
                }
            );
        });
    }

    insertUserLogin(userLogin) {
        return new Promise((resolve, reject) => {
            // (id, username, password, role, updatedAt)
            const sqlQuery = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.USER_LOGIN
            VALUES (?, ?, ?, ?, ?);`;

            DatabaseConnection.query(sqlQuery, Object.values(userLogin), (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve();
                }
            );
        });
    }
}

export default AuthModel;
