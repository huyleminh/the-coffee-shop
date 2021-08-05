import DatabaseConfig from "../../../configs/DatabaseConfig.js";
import DatabaseConnection from "../DatabaseConnection.js";

class Product {
    constructor(id, name, image, price, description, discountId, updatedAt, createdAt) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
        this.discountId = discountId;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new Product(
                row.id,
                row.name,
                row.image,
                row.price,
                row.description,
                row.discountId,
                row.updatedAt,
                row.createdAt
            );
        });
    };

    static getProducts = () => {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT
                p.id, p.name, p.image, p.price, p.description,
                c.name AS 'categoryName',
                pr.totalStar, pr.totalRating,
                p.discountId, d.percent, d.startDate, d.endDate
            FROM ${DatabaseConfig.CONFIG.DATABASE}.product p
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product_category pc ON p.id = pc.productId
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.category c ON c.id = pc.categoryId
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product_rating pr ON p.id = pr.productId
            LEFT JOIN ${DatabaseConfig.CONFIG.DATABASE}.discount d ON d.id = p.discountId;`

            DatabaseConnection.query(sql, (error, rows) => {
                if (error) {
                    reject(error)
                    return
                }

                if (rows === undefined)
                    reject(new Error("Error: 'rows' is undefined"))
                else {
                    const jsonString = JSON.stringify(rows)
                    const jsonData = JSON.parse(jsonString)
                    resolve(jsonData)
                }
            })
        })
    }

    static getSpecificProduct = (productId) => {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT
                p.id, p.name, p.image, p.price, p.description,
                c.name AS 'categoryName',
                pr.totalStar, pr.totalRating,
                p.discountId, d.percent, d.startDate, d.endDate
            FROM ${DatabaseConfig.CONFIG.DATABASE}.product p
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product_category pc ON p.id = pc.productId
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.category c ON c.id = pc.categoryId
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product_rating pr ON p.id = pr.productId
            LEFT JOIN ${DatabaseConfig.CONFIG.DATABASE}.discount d ON d.id = p.discountId
            WHERE p.id = ?;`

            DatabaseConnection.query(sql, productId, (error, rows) => {
                if (error) {
                    reject(error)
                    return
                }

                if (rows === undefined)
                    reject(new Error("Error: 'rows' is undefined"))
                else {
                    const jsonString = JSON.stringify(rows)
                    const jsonData = JSON.parse(jsonString)
                    resolve(jsonData)
                }
            })
        })
    }

    static searchProducts = (searchValue) => {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT
                p.id, p.name, p.image, p.price, p.description,
                c.name AS 'categoryName',
                pr.totalStar, pr.totalRating,
                p.discountId, d.percent, d.startDate, d.endDate
            FROM ${DatabaseConfig.CONFIG.DATABASE}.product p
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product_category pc ON p.id = pc.productId
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.category c ON c.id = pc.categoryId
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product_rating pr ON p.id = pr.productId
            LEFT JOIN ${DatabaseConfig.CONFIG.DATABASE}.discount d ON d.id = p.discountId
            WHERE p.name LIKE '%${searchValue}%';`;

            DatabaseConnection.query(sql, (error, rows) => {
                if (error) {
                    reject(error)
                    return
                }

                if (rows === undefined)
                    reject(new Error("Error: 'rows' is undefined"))
                else {
                    const jsonString = JSON.stringify(rows)
                    const jsonData = JSON.parse(jsonString)
                    resolve(jsonData)
                }
            })
        })
    }

    static filterProducts = (filterValue) => {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT
                p.id, p.name, p.image, p.price, p.description,
                c.name AS 'categoryName',
                pr.totalStar, pr.totalRating,
                p.discountId, d.percent, d.startDate, d.endDate
            FROM ${DatabaseConfig.CONFIG.DATABASE}.product p
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product_category pc ON p.id = pc.productId
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.category c ON c.id = pc.categoryId
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product_rating pr ON p.id = pr.productId
            LEFT JOIN ${DatabaseConfig.CONFIG.DATABASE}.discount d ON d.id = p.discountId
            WHERE BINARY c.name = ?;`;

            DatabaseConnection.query(sql, filterValue, (error, rows) => {
                if (error) {
                    reject(error)
                    return
                }

                if (rows === undefined)
                    reject(new Error("Error: 'rows' is undefined"))
                else {
                    const jsonString = JSON.stringify(rows)
                    const jsonData = JSON.parse(jsonString)
                    resolve(jsonData)
                }
            })
        })
    }

    static deleteByProductId = (productId) => {
        return new Promise((resolve, reject) => {
            const sql = `
            DELETE FROM ${DatabaseConfig.CONFIG.DATABASE}.product_ingredient WHERE productId = ?;
            DELETE FROM ${DatabaseConfig.CONFIG.DATABASE}.product_rating WHERE productId = ?;
            DELETE FROM ${DatabaseConfig.CONFIG.DATABASE}.product_category WHERE productId = ?;
            DELETE FROM ${DatabaseConfig.CONFIG.DATABASE}.product_order WHERE productId = ?;
            DELETE FROM ${DatabaseConfig.CONFIG.DATABASE}.cart WHERE productId = ?;
            DELETE FROM ${DatabaseConfig.CONFIG.DATABASE}.wishlist WHERE productId = ?;
            DELETE FROM ${DatabaseConfig.CONFIG.DATABASE}.product WHERE id = ?;
            `;

            const values = [productId, productId, productId, productId, productId, productId, productId]
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

export default Product;
