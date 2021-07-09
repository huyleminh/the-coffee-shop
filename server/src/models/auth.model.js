import DatabaseConnection from "../utilities/database/DatabaseConnection.js";
import DatabaseConfig from "../configs/DatabaseConfig.js";

class AuthModel {
    getUserLoginByUsername(username) {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.user_login WHERE USERNAME = ?`;

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
            const sqlQuery = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.user_login`;
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
}

export default AuthModel;
