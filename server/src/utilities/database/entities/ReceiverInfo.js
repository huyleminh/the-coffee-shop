import DatabaseConnection from "../DatabaseConnection.js"
import DatabaseConfig from "../../../configs/DatabaseConfig.js"

class ReceiverInfo {
    constructor(orderId, fullname, address, phoneNumber) {
        this.orderId = orderId
        this.fullname = fullname
        this.address = address
        this.phoneNumber = phoneNumber
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new ReceiverInfo(
                row.orderId,
                row.fullname,
                row.address,
                row.phoneNumber
            );
        });
    };

    insert() {
        const values = Object.values(this);

        return new Promise((resolve, reject) => {
            // (orderId, fullname, address, phoneNumber)
            const sql = `INSERT INTO ${DatabaseConfig.CONFIG.DATABASE}.receiver_info
            VALUES (?, ?, ?, ?);`;

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

export default ReceiverInfo
