import DatabaseConfig from "../configs/DatabaseConfig.js";
import DatabaseConnection from "../utilities/database/DatabaseConnection.js";
import UserInfo from "../utilities/database/entities/UserInfo.js";
import mysql from "mysql";

class UserModel {
    getUserInfoByAttribute(name, value) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.USER_INFO WHERE ${name} = ?;`;

            DatabaseConnection.query(sql, value, (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (rows == undefined) {
                    reject(new Error("Error: 'rows' is undefined"));
                    return;
                } else {
                    const userInfoList = UserInfo.toArrayFromDatabaseObject(rows);
                    resolve(userInfoList);
                }
            })
        })
    }

    updateUserInfoByAttributes(id, names, values) {
        return new Promise((resolve, reject) => {
            let setStatementValue = names.join("=?,");
            setStatementValue += "=?";
            setStatementValue = setStatementValue.replace("gender=?", "gender=b?");

            const sql = mysql.format(`UPDATE ${DatabaseConfig.CONFIG.DATABASE}.USER_INFO
            SET ${setStatementValue}
            WHERE id = '${id}';`, values);

            DatabaseConnection.query(sql, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            })
        })
    }

    updatePasswordForUserLogin(id, password) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ${DatabaseConfig.CONFIG.DATABASE}.USER_LOGIN
            SET password = ?
            WHERE id = '${id}';`;

            DatabaseConnection.query(sql, password, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            })
        })
    }
}

export default UserModel;
