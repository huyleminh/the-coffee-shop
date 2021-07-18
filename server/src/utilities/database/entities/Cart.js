import DatabaseConnection from "../DatabaseConnection.js"
import DatabaseConfig from "../../../configs/DatabaseConfig.js"

class Cart {
    constructor(productId, userId, quantity) {
        this.productId = productId
        this.userId = userId
        this.quantity = quantity
    }

    static insert = (productId, userId, quantity) => {
        return new Promise((resolve, reject) => {
            const sql = `
            INSERT ${DatabaseConfig.CONFIG.DATABASE}.cart (productId, userId, quantity)
            VALUES (?, ?, ?);`

            DatabaseConnection.query(sql, [productId, userId, quantity], (error) => {
                if (error) {
                    reject(error)
                    return
                }

                resolve()
            })
        })
    }
}

export default Cart
