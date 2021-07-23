import ClientAPI from "../ClientAPI";

class WishlistAPI {
    static getWishlist = (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        return ClientAPI.get("/wishlist/get", config)
    }

    static addToWishlist = (token, productId) => {
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        return ClientAPI.post("/wishlist/add", { productId }, config)
    }

    static deleteItem = (token, params) => {
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        return ClientAPI.delete(`/wishlist/delete?productId=${params}`, config)
    }
}

export default WishlistAPI