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
}

export default ProductCategory;
