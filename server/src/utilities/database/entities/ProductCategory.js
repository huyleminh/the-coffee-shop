import DatabaseConfig from "../../../configs/DatabaseConfig.js";
import DatabaseConnection from "../DatabaseConnection.js";

class ProductCategory {
    constructor(productId, categoryId) {
        this.productId = productId;
        this.categoryId = categoryId;
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new ProductCategory(
                row.productId,
                row.categoryId
            );
        });
    };

    // Each parameter is an object {key, value} with key is column name and value is a new value for key
    static updateOneAttribute = (condition, newData) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ${DatabaseConfig.CONFIG.DATABASE}.product_category
            SET ${newData.key} = ?
            WHERE ${condition.key} = ?;`;

            DatabaseConnection.query(sql, [newData.value, condition.value], (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }
}

export default ProductCategory;
