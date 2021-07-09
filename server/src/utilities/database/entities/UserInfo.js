import DatabaseConnection from "../DatabaseConnection.js";
import DatabaseConfig from "../../../configs/DatabaseConfig.js";

class UserInfo {
    constructor(id, fullname, address, phoneNumber, gender, updatedAt, createdAt) {
        this.id = id;
        this.fullname = fullname;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.gender = `${gender}`;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        // In MySQL, 'gender' is BIT data type.
        // In JS, 'gender' is an object { type: "Buffer", data: [] }.
        return jsonData.map((row) => {
            return new UserInfo(
                row.id,
                row.fullname,
                row.address,
                row.phoneNumber,
                row.gender.data[0],
                row.updatedAt,
                row.createdAt
            );
        });
    };

    insert() {
        const values = Object.values(this)

        return new Promise((resolve, reject) => {
            // (id, fullname, address, phoneNumber, gender, updatedAt, createdAt)
            const sql = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.user_info
            VALUES (?, ?, ?, ?, b?, ?, ?);`;

            DatabaseConnection.query(sql, values, (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve();
                }
            );
        });
    }

    static getAllId = () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id FROM ${DatabaseConfig.CONFIG.DATABASE}.user_login;`;

            DatabaseConnection.query(sql, (error, rows) => {
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

    static getAllByAttribute = (name, value) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.user_info WHERE ${name} = ?;`;

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

    static getAllByAttributes = (keys, values) => {
        return new Promise((resolve, reject) => {
            let whereStatement = keys.join("=?,");
            whereStatement += "=?";
            whereStatement = whereStatement.replace("gender=?", "gender=b?");

            const sql = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.user_info WHERE ${whereStatement};`;

            DatabaseConnection.query(sql, values, (error, rows) => {
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

    static getAllByUsernameAndPhoneNumber = (username, phoneNumber) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT info.*
            FROM ${DatabaseConfig.CONFIG.DATABASE}.user_login AS login
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.user_info AS info
            ON login.id = info.id
            WHERE login.username = ? OR info.phoneNumber = ?`;

            DatabaseConnection.query(sql, [username, phoneNumber], (error, rows) => {
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

    update(keys, values) {
        const id = this.id

        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === "gender")
                values[i] = `${values[i]}`

            this[keys[i]] = values
        }

        return new Promise((resolve, reject) => {
            let setStatement = keys.join("=?,");
            setStatement += "=?";
            setStatement = setStatement.replace("gender=?", "gender=b?");

            const sql = `UPDATE ${DatabaseConfig.CONFIG.DATABASE}.user_info
            SET ${setStatement}
            WHERE id = '${id}';`;

            DatabaseConnection.query(sql, values, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            })
        })
    }

    static updateByAttributes = (id, keys, values) => {
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === "gender") {
                values[i] = `${values[i]}`
                break
            }
        }

        return new Promise((resolve, reject) => {
            let setStatement = keys.join("=?,");
            setStatement += "=?";
            setStatement = setStatement.replace("gender=?", "gender=b?");

            const sql = `UPDATE ${DatabaseConfig.CONFIG.DATABASE}.user_info
            SET ${setStatement}
            WHERE id = '${id}';`;

            DatabaseConnection.query(sql, values, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            })
        })
    }
}

export default UserInfo;
