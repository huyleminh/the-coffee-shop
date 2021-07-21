import Cart from "../utilities/database/entities/Cart.js";
import UserInfo from "../utilities/database/entities/UserInfo.js";

class CheckoutController {
    static getUserInfo = async (req, res) => {
        const userInfo = res.locals.userInfo;

        res.send({
            status: 200,
            data: {
                name: userInfo.fullname,
                address: userInfo.address,
                phoneNumber: userInfo.phoneNumber,
                gender: userInfo.gender,
            },
        });
    };

    static confirmInfo = async (req, res, next) => {
        // Validate data in payload
        const payload = res.locals.payload;

        if (payload.products.length === 0) {
            res.send({
                status: 404,
                message: "There is no product in this order",
            });
            return;
        }

        const userInfo = res.locals.userInfo;
        const productsInCart = await Cart.getCartByUserId(userInfo.id);
        const productIdList = productsInCart.map((product) => product.id);
        for (let product of payload.products) {
            if (!productIdList.includes(product.id)) {
                res.send({
                    status: 404,
                    message:
                        "There is at least one product that does not exist in your cart",
                });
                return;
            }
        }

        next();
    };
}

export default CheckoutController;
