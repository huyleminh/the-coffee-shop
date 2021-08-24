import Cart from "../utilities/database/entities/Cart.js";
import Product from "../utilities/database/entities/Product.js"

class CartController {
    static getProducts = async (req, res) => {
        const userInfo = res.locals.userInfo;
        const productList = await Cart.getCartByUserId(userInfo.id);

        const productInCart = productList.map((product) => {
            let discount = null;
            if (product.discountId !== null) {
                discount = {
                    percent: product.percent,
                    startDate: product.startDate,
                    endDate: product.endDate,
                };
            }

            return {
                product: {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                },
                discount,
                quantity: product.quantity,
            };
        });

        res.send({ status: 200 ,data: productInCart })
    };

    static addProduct = async (req, res) => {
        const { productId, quantity } = res.locals.payload;
        const userInfo = res.locals.userInfo;

        // Validate product in cart
        const [product] = await Product.getSpecificProduct(productId)
        if (product === undefined) {
            res.send({ status: 404, message: "This product does not exist" })
            return
        }

        const [productInCart] = await Cart.getProductByUserIdAndProductId(userInfo.id, productId)
        if (productInCart !== undefined) {
            res.send({ status: 409, message: "This product has existed in your cart" })
            return
        }

        const cart = await Cart.insert(productId, userInfo.id, quantity);
        res.send({ status: 200 });
    };

    static deleteProduct = async (req, res) => {
        const { productId } = res.locals.params
        const userInfo = res.locals.userInfo

        // Validate product in cart
        const [product] = await Cart.getProductByUserIdAndProductId(userInfo.id, productId)

        if (product === undefined)
            res.send({ status: 404, message: "This product does not exist in your cart" })
        else {
            const deleteCart = await Cart.deleteByUserIdAndProductId(userInfo.id, productId)
            res.send({ status: 200 })
        }
    }

    static editProducts = async (req, res) => {
        const userInfo = res.locals.userInfo
        const payload = res.locals.payload

        // Validate data in payload
        const productsInCart = await Cart.getCartByUserId(userInfo.id)
        const index = productsInCart.findIndex(product => product.id === payload.productId)
        if (index === -1) {
            res.send({
                status: 404,
                message: "There is at least one product that does not exist in your cart"
            })
            return
        }

        // Updates each product
        const updateProducts = await Cart.updateByUserIdAndProductId(
            userInfo.id,
            payload.productId,
            payload.quantity
        )

        res.send({ status: 200 })
    }
}

export default CartController;
