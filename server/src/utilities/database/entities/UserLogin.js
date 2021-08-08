import DatabaseConnection from "../DatabaseConnection.js";
import DatabaseConfig from "../../../configs/DatabaseConfig.js";

class UserLogin {
    constructor(id, username, password, role, updatedAt) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.updatedAt = updatedAt;
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new UserLogin(
                row.id,
                row.username,
                row.password,
                row.role,
                row.updatedAt,
            );
        });
    };

    insert() {
        const values = Object.values(this)

        return new Promise((resolve, reject) => {
            // (id, username, password, role, updatedAt)
            const sqlQuery = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.user_login
            VALUES (?, ?, ?, ?, ?);`;

            DatabaseConnection.query(sqlQuery, values, (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve();
                }
            );
        });
    }

    cloneWithAttributes(keys) {
        const origin = this;
        const clone = {};

        for (let key of keys) {
            Object.defineProperty(clone, key, {
                value: origin[key],
                writable: true,
                enumerable: true
            })
        }

        return clone;
    }

    cloneExceptAttributes(keys) {
        const clone = { ...this };

        for (let key of keys) {
            delete clone[key];
        }

        return clone;
    }

    static getAllByAttribute = (key, value) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.user_login WHERE ${key} = ?;`;

            DatabaseConnection.query(sql, value, (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (rows == undefined) {
                    reject(new Error("Error: 'rows' is undefined"));
                    return;
                } else {
                    const userLoginList = UserLogin.toArrayFromDatabaseObject(rows);
                    resolve(userLoginList);
                }
            })
        })
    }

    static getAllByAttributes = (keys, values) => {
        return new Promise((resolve, reject) => {
            let whereStatement = keys.join("=?,");
            whereStatement += "=?";

            const sql = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.user_login WHERE ${whereStatement};`;

            DatabaseConnection.query(sql, values, (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (rows == undefined) {
                    reject(new Error("Error: 'rows' is undefined"));
                    return;
                } else {
                    const userLoginList = UserLogin.toArrayFromDatabaseObject(rows);
                    resolve(userLoginList);
                }
            })
        })
    }

    static getAll = () => {
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
                    const userLoginList = UserLogin.toArrayFromDatabaseObject(rows);
                    resolve(userLoginList);
                }
            });
        });
    }

    // only can update password and role.
    update(keys, values){
        const id = this.id;

        for (let i = 0; i < keys.length; i++) this[keys[i]] = values[i];

        return new Promise((resolve, reject) => {
            const setStatement = keys.join("=?,") + "=?";
            const sql = `UPDATE ${DatabaseConfig.CONFIG.DATABASE}.user_login
            SET ${setStatement}
            WHERE id = '${id}';`;

            DatabaseConnection.query(sql, values, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }
}

export default UserLogin;
