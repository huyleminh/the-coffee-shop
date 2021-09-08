import DatabaseConfig from "../../../configs/DatabaseConfig.js";
import DatabaseConnection from "../DatabaseConnection.js";

class Product {
    constructor(
        id,
        name,
        image,
        price,
        description,
        discountId,
        updatedAt,
        createdAt
    ) {
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
                p.id, p.name, p.image, p.price, p.description, p.createdAt,
                c.name AS 'categoryName',
                pr.totalStar, pr.totalRating,
                p.discountId, d.percent, d.startDate, d.endDate
            FROM ${DatabaseConfig.CONFIG.DATABASE}.product p
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product_category pc ON p.id = pc.productId
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.category c ON c.id = pc.categoryId
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.product_rating pr ON p.id = pr.productId
            LEFT JOIN ${DatabaseConfig.CONFIG.DATABASE}.discount d ON d.id = p.discountId;`;

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
            WHERE p.id = ?;`;

            DatabaseConnection.query(sql, productId, (error, rows) => {
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

    static getProductsByAttribute = (key, value) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.product
            WHERE ${key} = ?;`;

            DatabaseConnection.query(sql, value, (error, rows) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(rows);
            });
        });
    };

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

    insert(categoryId) {
        const values = Object.values(this)
            .concat([this.id, 0, 0])
            .concat([this.id, categoryId]);

        return new Promise((resolve, reject) => {
            const sql = `
            INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.product (id, name, image, price, description, discountId, updatedAt, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.product_rating (productId, totalStar, totalRating)
            VALUES (?, ?, ?);
            INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.product_category (productId, categoryId)
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

            const values = [
                productId,
                productId,
                productId,
                productId,
                productId,
                productId,
                productId,
            ];
            DatabaseConnection.query(sql, values, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    };

    static updateAttributes = (id, keys, values) => {
        return new Promise((resolve, reject) => {
            const setStatement = keys.join("=?,") + "=?";
            const sql = `UPDATE ${DatabaseConfig.CONFIG.DATABASE}.product
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
    };
}

export default Product;
