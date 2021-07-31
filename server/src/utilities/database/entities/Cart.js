import DatabaseConnection from "../DatabaseConnection.js";
import DatabaseConfig from "../../../configs/DatabaseConfig.js";
import mysql from "mysql"

class Cart {
    constructor(productId, userId, quantity) {
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
    }

    static getCartByUserId = (userId) => {
        return new Promise((resolve, reject) => {
            const sql = `
			SELECT
                p.id, p.name, p.image, p.price,
                c.quantity,
				p.discountId, d.percent, d.startDate, d.endDate
			FROM ${DatabaseConfig.CONFIG.DATABASE}.cart c
			JOIN ${DatabaseConfig.CONFIG.DATABASE}.product p ON c.productId = p.id
			LEFT JOIN ${DatabaseConfig.CONFIG.DATABASE}.discount d ON p.discountId = d.id
			WHERE c.userId = ?;`;

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
    }

    static getProductByUserIdAndProductId = (userId, productId) => {
        return new Promise((resolve, reject) => {
            const sql = `
			SELECT
                p.id, p.name, p.image, p.price,
                c.quantity,
				p.discountId, d.percent, d.startDate, d.endDate
            FROM ${DatabaseConfig.CONFIG.DATABASE}.cart c
			JOIN ${DatabaseConfig.CONFIG.DATABASE}.product p ON c.productId = p.id
			LEFT JOIN ${DatabaseConfig.CONFIG.DATABASE}.discount d ON p.discountId = d.id
			WHERE c.userId = ? AND c.productId = ?;`;

            DatabaseConnection.query(sql, [userId, productId], (error, rows) => {
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
    }

    static insert = (productId, userId, quantity) => {
        return new Promise((resolve, reject) => {
            const sql = `
            INSERT ${DatabaseConfig.CONFIG.DATABASE}.cart (productId, userId, quantity)
            VALUES (?, ?, ?);`;

            DatabaseConnection.query(sql, [productId, userId, quantity], (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve();
                }
            );
        });
    };

    static deleteByUserIdAndProductId = (userId, productId) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM ${DatabaseConfig.CONFIG.DATABASE}.cart
            WHERE userId = ? AND productId = ?;`;

            DatabaseConnection.query(sql, [userId, productId], (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            })
        })
    }

    static updateByUserIdAndProductId = (userId, productId, quantity) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ${DatabaseConfig.CONFIG.DATABASE}.cart
            SET quantity = ?
            WHERE userId = ? AND productId = ?;`

            DatabaseConnection.query(sql, [quantity, userId, productId], (error) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve()
            })
        })
    }
}

export default Cart;
