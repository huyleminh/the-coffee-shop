import Product from "../utilities/database/entities/Product.js";
import Discount from "../utilities/database/entities/Discount.js";
import { v4 as uuidv4 } from "uuid";
class AdminController {
    static getAllProducts = async (req, res) => {
        // Các dữ liệu có sẵn
        // res.locals.userInfo
        // res.locals.userLogin
        // res.locals.payload
        // res.locals.params
        // Các lỗi đã xử lý
        // { status: 404, message: "This user does not exist" }
        // { status: 401, message: "Lack of information in the token" }
        // { status: 403, message: <depend on error> }
    };

    static createProduct = async (req, res) => {
        // Các dữ liệu có sẵn
        // res.locals.userInfo
        // res.locals.userLogin
        // res.locals.payload
        // res.locals.params
        // Các lỗi đã xử lý
        // { status: 404, message: "This user does not exist" }
        // { status: 401, message: "Lack of information in the token" }
        // { status: 403, message: <depend on error> }
    };

    static editProduct = async (req, res) => {
        const payloads = res.locals.payload;
        if (payloads.name != undefined) {
            const [checkProductName] = await Product.getProductsByName(
                payloads["name"]
            );
            if (checkProductName !== undefined) {
                res.send({
                    status: 409,
                    message: "This product has existed in the system",
                });
                return;
            }
        }

        var discountId;

        if (payloads.discount !== null) {
            var discount = payloads.discount;
            delete payloads.discount;
            if (discount.id !== undefined) {
                discountId = discount.id;
            } else {
                discountId = uuidv4();
                const discountInfo = {
                    id: discountId,
                    percent: discount.percent,
                    active: 1,
                    startDate: discount.startDate,
                    endDate: discount.endDate,
                };
                const insertDiscount = await Discount.insert(discountInfo);
            }
        } else {
            delete payloads.discount;
            discountId = null;
        }

        payloads.discountId = discountId;
        const editProduct = await Product.edit(payloads);
        res.send({
            status: 200,
        });
    };

    static deleteProduct = async (req, res) => {
        const params = res.locals.params;
        const countParams = Object.keys(params).length;

        if (
            countParams !== 1 ||
            (countParams === 1 && params.productId === undefined)
        )
            res.send({ status: 400, message: "Params is invalid" });
        else {
            const deleteProduct = await Product.deleteByProductId(
                params.productId
            );
            res.send({ status: 200 });
        }
    };
}

export default AdminController;
