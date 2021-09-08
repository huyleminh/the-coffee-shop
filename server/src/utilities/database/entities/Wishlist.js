import DatabaseConnection from "../DatabaseConnection.js";
import DatabaseConfig from "../../../configs/DatabaseConfig.js";

class Wishlist {
    constructor(productId, userId) {
        this.productId = productId;
        this.userId = userId;
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new Wishlist(row.productId, row.userId);
        });
    };

    static getAllProductByUserId = (userId) => {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT
	            P.id, P.name, P.image, P.price,
                p.discountId, D.percent, D.startDate, D.endDate
            FROM ${DatabaseConfig.CONFIG.DATABASE}.wishlist W
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product P ON W.productId=P.id
            LEFT JOIN ${DatabaseConfig.CONFIG.DATABASE}.discount D ON P.discountId=D.id
            WHERE W.userId = ?`;

            DatabaseConnection.query(sql, userId, (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (rows === undefined)
                    reject(new Error("Error: 'rows' is undefined"));
                else {
                    const jsonString = JSON.stringify(rows);
                    const jsonData = JSON.parse(jsonString);
                    resolve(jsonData);
                }
            });
        });
    };

    static getProductByUserIdAndProductId = (userId, productId) => {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT
	            P.id, P.name, P.image, P.price,
                p.discountId, D.percent, D.startDate, D.endDate
            FROM ${DatabaseConfig.CONFIG.DATABASE}.wishlist W
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product P ON W.productId = P.id
            LEFT JOIN ${DatabaseConfig.CONFIG.DATABASE}.discount D ON P.discountId = D.id
            WHERE W.userId = ? AND W.productId = ?`;

            DatabaseConnection.query(
                sql,
                [userId, productId],
                (error, rows) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    if (rows === undefined)
                        reject(new Error("Error: 'rows' is undefined"));
                    else {
                        const jsonString = JSON.stringify(rows);
                        const jsonData = JSON.parse(jsonString);
                        resolve(jsonData);
                    }
                }
            );
        });
    };

    static insert(productId, userId) {
        return new Promise((resolve, reject) => {
            // (productId, userId)
            const sql = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.wishlist
            VALUES (?, ?);`;

            DatabaseConnection.query(sql, [productId, userId], (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }

    static deleteProduct = (productId) => {
        return new Promise((resolve, reject) => {
            const sql = `
            DELETE FROM
            ${DatabaseConfig.CONFIG.DATABASE}.wishlist
            WHERE productId = ?`;

            DatabaseConnection.query(sql, productId, (error) => {
                if (error) {
                    reject(error);
                    return;
                } else {
                    resolve();
                }
            });
        });
    };
}

export default Wishlist;
