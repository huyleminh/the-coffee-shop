import DatabaseConnection from "../DatabaseConnection.js"
import DatabaseConfig from "../../../configs/DatabaseConfig.js"

class Order {
    constructor(id, aliasId, userId, createdAt, status, isPaid, payMethod, deliveryFee) {
        this.id = id
        this.aliasId = aliasId
        this.userId = userId
        this.createdAt = createdAt
        this.status = status
        this.isPaid = isPaid
        this.payMethod = payMethod
        this.deliveryFee = deliveryFee
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
                row.aliasId,
                row.userId,
                row.createdAt,
                row.status,
                row.isPaid,
                row.payMethod,
                row.deliveryFee
            );
        });
    };

    static getAllAliasId = () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT aliasId FROM ${DatabaseConfig.CONFIG.DATABASE}.order;`
            DatabaseConnection.query(sql, (error, rows) => {
                if (error) {
                    reject(error)
                    return
                }

                if (rows === undefined)
                    reject(new Error("Error: 'rows' is undefined"))
                else {
                    const jsonString = JSON.stringify(rows)
                    const aliasIdList = JSON.parse(jsonString)

                    resolve(aliasIdList)
                }
            })
        })
    }

    static getAllByUserId = (userId) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT *
            FROM ${DatabaseConfig.CONFIG.DATABASE}.order o
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.receiver_info ri ON o.id = ri.orderId
            WHERE userId = ?;`

            DatabaseConnection.query(sql, userId, (error, rows) => {
                if (error) {
                    reject(error)
                    return
                }

                if (rows === undefined)
                    reject(new Error("Error: 'rows' is undefined"))
                else {
                    const jsonString = JSON.stringify(rows)
                    const orderList = JSON.parse(jsonString)

                    resolve(orderList)
                }
            })
        })
    }

    insert() {
        const values = Object.values(this);

        return new Promise((resolve, reject) => {
            // (id, asliasId, userId, createdAt, status, isPaid, payMethod, deliveryFee)
            const sql = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.order
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

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
