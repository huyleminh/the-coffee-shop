class ProductRating {
    constructor(productId, totalStar, totalRating) {
        this.productId = productId;
        this.totalStar = totalStar;
        this.totalRating = totalRating;
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new ProductRating(
                row.productId,
                row.totalStar,
                row.totalRating
            );
        });
    };
}

export default ProductRating;
