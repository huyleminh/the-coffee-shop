import Cart from "../utilities/database/entities/Cart.js"

class CartController {
    static addProduct = async (req, res) => {
        const { productId, quantity } = res.locals.payload
        const userInfo = res.locals.userInfo
        const cart = await Cart.insert(productId, userInfo.id, quantity)

        res.send({ status: 200 })
    }
}

export default CartController
