import DatabaseConnection from "../DatabaseConnection.js";
import DatabaseConfig from "../../../configs/DatabaseConfig.js";

class Discount {
    constructor(id, percent, active, startDate, endDate) {
        this.id = id;
        this.percent = percent;
        this.active = active;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new Discount(
                row.id,
                row.percent,
                row.active,
                row.startDate,
                row.endDate
            );
        });
    };

    static getAll = () => {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.discount;`;
            DatabaseConnection.query(sqlQuery, (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (rows === undefined) {
                    reject(new Error("Error: 'rows' is underfined"));
                } else {
                    const discounts = Discount.toArrayFromDatabaseObject(rows);
                    resolve(discounts);
                }
            });
        });
    }

    insert() {
        const values = Object.values(this);

        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.discount
            VALUES (?, ?, ?, ?, ?)`;

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

export default Discount;
