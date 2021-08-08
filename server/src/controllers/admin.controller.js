import Product from "../utilities/database/entities/Product.js";
import Category from "../utilities/database/entities/Category.js";
import Discount from "../utilities/database/entities/Discount.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from 'dotenv'

dotenv.config()

class AdminController {
    static getAllProducts = async (req, res) => {
        const productList = await Product.getProducts();
        const products = productList.map((product) => {
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
                    createdAt: product.createdAt,
                },
                categoryName: product.categoryName,
                rating: {
                    totalStar: product.totalStar,
                    totalRating: product.totalRating,
                },
                discount,
            };
        });

        res.send({ status: 200, data: products });
    };

    static createProduct = async (req, res) => {
        const payload = res.locals.payload;
        const products = await Product.getAllWithSpecificAttributes(["id", "name"])
        const indexProductName = products.findIndex(product => product.name === payload.name)

        if (indexProductName !== -1)
            res.send({ status: 409, message: "This product has existed in the system" });
        else {
            const categories = await Category.getAll();
            const indexCategoryName = categories.findIndex(category => {
                return category.name === payload.categoryName
            })

            // insert new category if duplicate
            const categoryId = (indexCategoryName === -1) ? uuidv4() : categories[indexCategoryName].id
            if (indexCategoryName === -1) {
                const newCategory = new Category(categoryId, payload.categoryName)
                const insertCategory = await newCategory.insert()
            }

            // insert new discount if receive new discount
            const discountId = (payload.discount.id === undefined) ? uuidv4() : payload.discount.id
            if (payload.discount.id === undefined) {
                const newDiscount = new Discount(
                    discountId,
                    payload.discount.percent,
                    true,
                    payload.discount.startDate,
                    payload.discount.endDate
                )
                const insertNewDiscount = await newDiscount.insert()
            }

            // insert new product (includes product_rating)
            const now = new Date()
            const dateString = now.toJSON()
            const newProductId = uuidv4()
            const image = (payload.image === undefined) ? "" : `img_${newProductId}${payload.image}`
            const newProduct = new Product(
                newProductId,
                payload.name,
                image,
                payload.price,
                payload.description,
                discountId,
                dateString,
                dateString
            )
            const insertNewProduct = await newProduct.insert(categoryId)

            // create new product successfully
            res.send({ status: 200 });
        }
    };

    static editProduct = async (req, res) => {
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
