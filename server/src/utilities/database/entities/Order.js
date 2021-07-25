import DatabaseConnection from "../DatabaseConnection.js"
import DatabaseConfig from "../../../configs/DatabaseConfig.js"

class Order {
    constructor(id, userId, createdAt, status, isPaid, payMethod, fullname, deliveryAddress, phoneNumber) {
        this.id = id
        this.userId = userId
        this.createdAt = createdAt
        this.status = status
        this.isPaid = isPaid
        this.payMethod = payMethod
        this.fullname = fullname
        this.deliveryAddress = deliveryAddress
        this.phoneNumber = phoneNumber
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new Order(
                row.id,
                row.userId,
                row.createdAt,
                row.status,
                row.isPaid,
                row.payMethod,
                row.fullname,
                row.deliveryAddress,
                row.phoneNumber
            );
        });
    };

    insert() {
        const values = Object.values(this);

        return new Promise((resolve, reject) => {
            // (id, userId, createdAt, status, isPaid, payMethod, fullname, deliveryAddress, phoneNumber)
            const sql = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.order
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

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
