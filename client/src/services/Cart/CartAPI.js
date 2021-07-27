import ClientAPI from "../ClientAPI.js";

class CartAPI {
    static getCart = (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        return ClientAPI.get("/cart/get", config)
    }

    static addToCart = (token, payload) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        return ClientAPI.get("/cart/add", payload, config)
    }

    static deleteProduct = (token, productId) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        return ClientAPI.get(`/cart/delte=${productId}`, config)
    }

    static editCart = (token, payload) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        return ClientAPI.get("/cart/edit", payload, config)
    }
}

export default CartAPI