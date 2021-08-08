import DatabaseConnection from "../DatabaseConnection.js";
import DatabaseConfig from "../../../configs/DatabaseConfig.js";

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new Category(row.id, row.name);
        });
    };

    static getAll = () => {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.category;`;
            DatabaseConnection.query(sqlQuery, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (result === undefined) {
                    reject(new Error("Error: 'result' is underfined"));
                } else {
                    const categoriesInfo =
                        Category.toArrayFromDatabaseObject(result);
                    resolve(categoriesInfo);
                }
            });
        });
    };

    static getAllCategoryId = () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id FROM ${DatabaseConfig.CONFIG.DATABASE}.category;`;

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

    static getCategoryIdByName = (name) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id FROM ${DatabaseConfig.CONFIG.DATABASE}.category
                WHERE name = ?;`;

            DatabaseConnection.query(sql, name, (error, rows) => {
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
    };

    insert() {
        const values = Object.values(this);

        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.category
            VALUES (?, ?)`;

            DatabaseConnection.query(sql, values, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve()
            });
        });
    }
}

export default Category;
