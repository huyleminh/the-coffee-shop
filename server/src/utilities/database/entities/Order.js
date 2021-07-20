import DatabaseConnection from "../DatabaseConnection.js"
import DatabaseConfig from "../../../configs/DatabaseConfig.js"

class Order {
    constructor(id, userId, createdAt, status, isPaid, payMethod, deliveryAddress) {
        this.id = id
        this.userId = userId
        this.createdAt = createdAt
        this.status = status
        this.isPaid = isPaid
        this.payMethod = payMethod
        this.deliveryAddress = deliveryAddress
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

    insert() {
        const values = Object.values(this);

        return new Promise((resolve, reject) => {
            // (id, userId, createdAt, status, isPaid, payMethod, deliveryAddress)
            const sql = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.order
            VALUES (?, ?, ?, ?, ?, ?, ?);`;

            DatabaseConnection.query(sql, values, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }
}

export default Order
