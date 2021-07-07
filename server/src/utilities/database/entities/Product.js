class Product {
    constructor(id, name, image, price, description, discountId, updatedAt, createdAt) {
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
}

export default Product;
