import DatabaseConnection from "../utilities/database/DatabaseConnection.js";

class TestModel {
    getTest() {
        return new Promise((resolve, reject) => {
            DatabaseConnection.query("select * from chuyenbay", function (err, rows) {
                if (err) {
                    reject(err);
                    return;
                }
                if (rows === undefined) {
                    reject(new Error("Error rows is undefined"));
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

export default TestModel;
