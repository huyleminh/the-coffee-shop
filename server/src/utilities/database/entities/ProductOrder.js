import DatabaseConfig from "../../../configs/DatabaseConfig.js";
import DatabaseConnection from "../DatabaseConnection.js";
import mysql from "mysql"

class ProductOrder {
    constructor(productId, orderId, quantity, price) {
        this.productId = productId
        this.orderId = orderId
        this.quantity = quantity
        this.price = price
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new ProductOrder(
                row.productId,
                row.orderId,
                row.quantity,
                row.price,
            );
        });
    };

    static insertList = (productOrderList) => {
        return new Promise((resolve, reject) => {
            let sql = ""
            productOrderList.forEach(productOrder => {
                sql += mysql.format(
                    `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.product_order VALUES (?, ?, ?, ?);\n`,
                    Object.values(productOrder)
                )
            })
            console.log(sql)
            DatabaseConnection.query(sql, (error) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve()
            })
        })
    }
}

export default ProductOrder
