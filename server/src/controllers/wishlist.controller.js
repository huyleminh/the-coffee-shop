import Wishlist from "../utilities/database/entities/Wishlist.js";
import { validate as uuidValidate } from "uuid";
class WishlistController {
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

        const ProductInfo = res.locals.payload;
        console.log(ProductInfo.productId,userInfo.id);
        // if (uuidValidate(ProductInfo)) {
        //     const NewWishlist = new Wishlist(ProductInfo, userInfo);
        //     const insertToDB = await NewWishlist.insert();
        //     res.send({ status: 200 });
        // }
        const insertToDB = await Wishlist.insert(ProductInfo.productId, userInfo.id);
        res.send({ status: 200 });
    };
}
export default WishlistController;
