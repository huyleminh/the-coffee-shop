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
}

export default Order
