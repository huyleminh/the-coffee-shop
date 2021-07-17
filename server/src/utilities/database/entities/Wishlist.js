import DatabaseConnection from "../DatabaseConnection.js";
import DatabaseConfig from "../../../configs/DatabaseConfig.js";
class Wishlist {
    constructor(id, name, image, discount, price) {
        this.id = id;
        this.name = name;
        this.id = image;
        this.name = discount;
        this.id = price;
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new Category(
                row.id,
                row.name,
                row.image,
                row.discount,
                row.price
            );
        });
    };

    static getAll = () => {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.wishlist;`;
            DatabaseConnection.query(sqlQuery, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (result === undefined) {
                    reject(new Error("Error: 'result' is underfined"));
                } else {
                    const wishlistInfo =
                        Wishlist.toArrayFromDatabaseObject(result);
                    resolve(wishlistInfo);
                }
            });
        });
    };

    static getProductInWishlist = (userId) => {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT 
	            P.id, P.image, P.price,
                p.discountId, D.percent, D.startDate, D.endDate
            FROM ${DatabaseConfig.CONFIG.DATABASE}.wishlist W
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product P ON W.productId=P.id
            LEFT JOIN ${DatabaseConfig.CONFIG.DATABASE}.discount D ON P.discountId=D.id
            WHERE W.userId='%${userId}%'`;

            DatabaseConnection.query(sql, (error, rows) => {
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

    insert() {
        const values = Object.values(this);

        return new Promise((resolve, reject) => {
            // (ProductId,UserId)
            const sql = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.wishlist
            VALUES (?, ?);`;

            DatabaseConnection.query(sql, values, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }

    static DeleteProductInWishlist = (productId) => {
        return new Promise((resolve, reject) => {
            const sql = `
            DELETE FROM 
            heroku_a51da3167c7e5af.wishlist W
            WHERE W.productId='%${productId}%'`;

            DatabaseConnection.query(sql, (error) => {
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
