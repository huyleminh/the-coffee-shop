import DatabaseConnection from "../utilities/database/DatabaseConnection.js";
import DatabaseConfig from "../configs/DatabaseConfig.js";

class AuthModel {
    getAllId() {
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
                    // Convert variable 'rows' from [RowDataPacket{}] to [{}]
                    // This array has at most one element.
                    const jsonString = JSON.stringify(rows);
                    const jsonData = JSON.parse(jsonString);

                    resolve(jsonData);
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
                    // Convert variable 'rows' from [RowDataPacket{}] to [{}]
                    const jsonString = JSON.stringify(rows);
                    const jsonData = JSON.parse(jsonString);

                    resolve(jsonData);
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

            DatabaseConnection.query(sqlQuery,  [username, phoneNumber], (error, rows) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    if (rows === undefined) {
                        reject(new Error("Error: 'rows' is undefined"));
                    } else {
                        // Convert variable 'rows' from [RowDataPacket{}] to [{}]
                        // This array has at most two element.
                        const jsonString = JSON.stringify(rows);
                        const jsonData = JSON.parse(jsonString);

                        resolve(jsonData);
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
                    // Convert variable 'rows' from [RowDataPacket{}] to [{}]
                    const jsonString = JSON.stringify(rows);
                    const jsonData = JSON.parse(jsonString);

                    resolve(jsonData);
                }
            });
        });
    }

    insertUserInfo(id, fullname, address, phoneNumber, gender) {
        return new Promise((resolve, reject) => {
            const sqlQuery = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.USER_INFO (id, fullname, address, phoneNumber, gender, updatedAt, createdAt)
            VALUES (?, ?, ?, ?, b?, current_timestamp(), current_timestamp());`;
            const userInfo = [id, fullname, address, phoneNumber, gender];

            DatabaseConnection.query(sqlQuery, userInfo, (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve();
                }
            );
        });
    }

    insertUserLogin(id, username, password, role) {
        return new Promise((resolve, reject) => {
            const sqlQuery = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.USER_LOGIN (id, username, password, role, updatedAt)
            VALUES (?, ?, ?, ?, current_timestamp());`;
            const userLogin = [id, username, password, role];

            DatabaseConnection.query(sqlQuery, userLogin, (error) => {
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
