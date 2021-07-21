import ClientAPI from "../ClientAPI";

class WishlistAPI {
    static getWishlist = (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        return ClientAPI.get("/wishlist/get", config)
    }
}

export default WishlistAPI