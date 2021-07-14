class Discount {
    constructor(id, percent, active, startDate, endDate) {
        this.id = id;
        this.percent = percent;
        this.active = active;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new Discount(
                row.id,
                row.percent,
                row.active,
                row.startDate,
                row.endDate
            );
        });
    };
}

export default Discount;
