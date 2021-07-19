import Wishlist from "../utilities/database/entities/Wishlist.js";
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
}
export default WishlistController;
