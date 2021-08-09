import DatabaseConnection from "../DatabaseConnection.js"
import DatabaseConfig from "../../../configs/DatabaseConfig.js"

class Order {
    constructor(id, aliasId, userId, createdAt, status, isPaid, payMethod, deliveryFee, totalProducts, totalPrice) {
        this.id = id
        this.aliasId = aliasId
        this.userId = userId
        this.createdAt = createdAt
        this.status = status
        this.isPaid = isPaid
        this.payMethod = payMethod
        this.deliveryFee = deliveryFee
        this.totalProducts = totalProducts
        this.totalPrice = totalPrice
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
                row.deliveryFee,
                row.totalProducts,
                row.totalPrice
            );
        });
    };

    static getAllByDate = (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT *
            FROM ${DatabaseConfig.CONFIG.DATABASE}.order o
            JOIN ${DatabaseConfig.CONFIG.DATABASE}.receiver_info ri ON o.id = ri.orderId
            WHERE o.createdAt BETWEEN CAST(? AS DATETIME) AND CAST(? AS DATETIME);`

            DatabaseConnection.query(sql, [startDate, endDate], (error, rows) => {
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

    static getByOrderId = (orderId) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.order
            WHERE id = ?;`

            DatabaseConnection.query(sql, orderId, (error, rows) => {
                if (error) {
                    reject(error)
                    return
                }

                if (rows === undefined)
                    reject(new Error("Error: 'rows' is undefined"))
                else {
                    const orderList = Order.toArrayFromDatabaseObject(rows)
                    resolve(orderList)
                }
            })
        })
    }

    static getByOrderIdAndUserId = (orderId, userId) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${DatabaseConfig.CONFIG.DATABASE}.order
            WHERE id = ? AND userId = ?;`

            DatabaseConnection.query(sql, [orderId, userId], (error, rows) => {
                if (error) {
                    reject(error)
                    return
                }

                if (rows === undefined)
                    reject(new Error("Error: 'rows' is undefined"))
                else {
                    const orderList = Order.toArrayFromDatabaseObject(rows)
                    resolve(orderList)
                }
            })
        })
    }

    insert() {
        const values = Object.values(this);

        return new Promise((resolve, reject) => {
            // (id, asliasId, userId, createdAt, status, isPaid, payMethod, deliveryFee, totalProducts, totalPrice)
            const sql = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.order
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

            DatabaseConnection.query(sql, values, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }

    update(keys, values) {
        const id = this.id;

        for (let i = 0; i < keys.length; i++) this[keys[i]] = values[i];

        return new Promise((resolve, reject) => {
            const setStatement = keys.join("=?,") + "=?";
            const sql = `UPDATE ${DatabaseConfig.CONFIG.DATABASE}.order
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
    }
}

export default Order
