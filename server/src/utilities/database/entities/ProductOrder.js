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
}

export default ProductOrder
