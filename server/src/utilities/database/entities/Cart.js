import DatabaseConnection from "../DatabaseConnection.js";
import DatabaseConfig from "../../../configs/DatabaseConfig.js";

class Cart {
    constructor(productId, userId, quantity) {
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
    }

    static getAll = () => {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * 
            FROM ${DatabaseConfig.CONFIG.DATABASE}.cart;`;
		
            DatabaseConnection.query(sqlQuery, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (result === undefined) {
                    reject(new Error("Error: 'result' is underfined"));
                } else {
                    const cartInfo = Cart.toArrayFromDatabaseObject(result);
                    resolve(cartInfo);
                }
            });
        });
    };

    static getCartByUserId = (userId) => {
        return new Promise((resolve, reject) => {
            const sql = `
				SELECT 
				P.id, P.image, P.price,
					p.discountId, D.percent, D.startDate, D.endDate
				FROM ${DatabaseConfig.CONFIG.DATABASE}.cart C
				JOIN ${DatabaseConfig.CONFIG.DATABASE}.product P ON C.productId = P.id
				LEFT JOIN ${DatabaseConfig.CONFIG.DATABASE}.discount D ON P.discountId = D.id
				WHERE C.userId = ?`;
           
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

    static insert = (productId, userId, quantity) => {
        return new Promise((resolve, reject) => {
            const sql = `
            INSERT ${DatabaseConfig.CONFIG.DATABASE}.cart (productId, userId, quantity)
            VALUES (?, ?, ?);`;

            DatabaseConnection.query(
                sql,
                [productId, userId, quantity],
                (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve();
                }
            );
        });
    };
}

export default Cart;
