import Wishlist from "../utilities/database/entities/Wishlist.js";
import Product from "../utilities/database/entities/Product.js";

class WishlistController {
    static getProducts = async (req, res) => {
        const userInfo = res.locals.userInfo;
        const productList = await Wishlist.getAllProductByUserId(userInfo.id);
        const productInWishlist = productList.map(product => {
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
            };
        });

        res.send({ status: 200, data: productInWishlist });
    };

    static addProduct = async (req, res) => {
        const userInfo = res.locals.userInfo;
        const { productId } = res.locals.payload;

        const [productInProductTable] = await Product.getSpecificProduct(productId)
        if (productInProductTable === undefined) {
            res.send({ status: 404, message: "This product does not exist" });
            return
        }

        const [productInWishlist] = await Wishlist.getProductByUserIdAndProductId(
            userInfo.id,
            productId
        )
        if (productInWishlist !== undefined) {
            res.send({
                status: 409,
                message: "This product has existed in your wishlist",
            });
        } else {
            const insertProduct = await Wishlist.insert(
                productId,
                userInfo.id
            );
            res.send({ status: 200 });
        }
    };

    static deleteProduct = async (req, res) => {
        const userInfo = res.locals.userInfo
        const { productId } = res.locals.params;
        const [productInWishList] = await Wishlist.getProductByUserIdAndProductId(
            userInfo.id,
            productId
        )

        if (productInWishList === undefined) {
            res.send({
                status: 404,
                message: "This product does not exist in your wishlist"
            });
            return
        }

        const deleteProduct = await Wishlist.deleteProduct(productId);
        res.send({ status: 200 });
    };
}

export default WishlistController;
