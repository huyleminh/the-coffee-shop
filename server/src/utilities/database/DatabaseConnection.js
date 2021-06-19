import mysql from "mysql";
import DatabaseConfig from "../../configs/DatabaseConfig.js";

export const DatabaseConnection = mysql.createPool({
    host: DatabaseConfig.CONFIG.HOST,
    user: DatabaseConfig.CONFIG.USER,
    password: DatabaseConfig.CONFIG.PASSWORD,
    database: DatabaseConfig.CONFIG.DATABASE,
});

export default DatabaseConnection;
