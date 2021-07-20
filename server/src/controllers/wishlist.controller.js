import Wishlist from "../utilities/database/entities/Wishlist.js";
import { validate as uuidValidate } from "uuid";
class WishlistController {
    static checkProductInWishlist = async (productId, userId) => {
        const WishlistData = await Wishlist.getByUserId(userId);

        for (var i = 0; i < WishlistData.length; i++) {
            if (WishlistData[i].productId === productId) return true;
        }
        return false;
    };

    static getProductInWishlist = async (req, res) => {
        const userInfo = res.locals.userInfo;

        const productrList = await Wishlist.getProductInWishlist(userInfo.id);
        const productInWishlist = productrList.map((product) => {
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
                },
                discount,
            };
        });
        res.send({ status: 200, data: productInWishlist });
    };

    static addProductIntoWishlist = async (req, res) => {
        const userInfo = res.locals.userInfo;

        const productInfo = res.locals.payload;
        if (!uuidValidate(productInfo.productId)) {
            res.send({ status: 404, message: "Productid invalid" });
        } else {
            if (
                await this.checkProductInWishlist(
                    productInfo.productId,
                    res.locals.userInfo.id
                )
            ) {
                res.send({
                    status: 404,
                    message: "Productid already in the wishlist",
                });
            } else {
                const insertToDB = await Wishlist.insert(
                    productInfo.productId,
                    userInfo.id
                );
                res.send({ status: 200 });
            }
        }
    };

    static DeleteProductInWishlist = async (req, res) => {
        const productInfo = res.locals.params;
        if (!uuidValidate(productInfo.productId)) {
            res.send({ status: 404, message: "Productid invalid" });
        } else {
            if (!
                await this.checkProductInWishlist(
                    productInfo.productId,
                    res.locals.userInfo.id
                )
            ) {
                res.send({ status: 404, message: "Productid not found" });
            } else {
                const deleteDB = await Wishlist.DeleteProductInWishlist(
                    productInfo.productId
                );
                res.send({ status: 200 });
            }
        }
    };
}
export default WishlistController;
