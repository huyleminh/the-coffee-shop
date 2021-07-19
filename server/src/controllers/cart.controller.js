import Cart from "../utilities/database/entities/Cart.js";

class CartController {
    static getProduct = async (req, res) => {
        const userInfo = res.locals.userInfo;
        const productrList = await Cart.GetCartUserId(userInfo.id);

        const productInCart = productrList.map((product) => {
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
                    description: product.description,
                    quantity: product.quantity,
                },
                discount,
            };
        });
        res.send({status:200,data:productInCart})
    };

    static addProduct = async (req, res) => {
        const { productId, quantity } = res.locals.payload;
        const userInfo = res.locals.userInfo;
        const cart = await Cart.insert(productId, userInfo.id, quantity);

        res.send({ status: 200 });
    };
}

export default CartController;
