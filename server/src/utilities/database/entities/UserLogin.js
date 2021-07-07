class UserLogin {
    constructor(id, username, password, role, updatedAt) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.updatedAt = updatedAt;
    }

    // rows: [RowDataPacket{}].
    // 'rows' is an array of objects (RowDataPacket) which contains data of a specific table in database.
    // each element in 'rows' is a row in table.
    static toArrayFromDatabaseObject = (rows) => {
        const jsonString = JSON.stringify(rows);
        const jsonData = JSON.parse(jsonString);

        return jsonData.map((row) => {
            return new UserLogin(
                row.id,
                row.username,
                row.password,
                row.role,
                row.updatedAt,
            );
        });
    };
}

export default UserLogin;
