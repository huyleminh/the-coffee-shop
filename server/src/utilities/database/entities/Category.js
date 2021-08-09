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

    static getByAttribute = (key, value) => {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.category
            WHERE ${key} = ?;`;

            DatabaseConnection.query(sqlQuery, value, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (result === undefined) {
                    reject(new Error("Error: 'result' is underfined"));
                } else {
                    const categoriesInfo = Category.toArrayFromDatabaseObject(result);
                    resolve(categoriesInfo);
                }
            });
        });
    }

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
