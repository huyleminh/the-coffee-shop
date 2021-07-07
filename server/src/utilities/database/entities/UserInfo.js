class UserInfo {
    constructor(id, fullname, address, phoneNumber, gender, updatedAt, createdAt) {
        this.id = id;
        this.fullname = fullname;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        // In MySQL, 'gender' is BIT data type.
        // In JS, 'gender' is an object { type: "Buffer", data: [] }.
        return jsonData.map((row) => {
            return new UserInfo(
                row.id,
                row.fullname,
                row.address,
                row.phoneNumber,
                row.gender.data[0],
                row.updatedAt,
                row.createdAt
            );
        });
    };
}

export default UserInfo;
