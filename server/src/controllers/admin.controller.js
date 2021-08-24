import Product from "../utilities/database/entities/Product.js";
import ProductCategory from "../utilities/database/entities/ProductCategory.js";
import Category from "../utilities/database/entities/Category.js";
import Discount from "../utilities/database/entities/Discount.js";
import { v4 as uuidv4 } from "uuid";

class AdminController {
    static getAllProducts = async (req, res) => {
        const productList = await Product.getProducts();
        const products = productList.map((product) => {
            let discount = null;
            if (product.discountId !== null) {
                discount = {
                    id: product.discountId,
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
        const [productExisted] = await Product.getProductsByAttribute("name", payload.name)

        if (productExisted !== undefined)
            res.send({ status: 409, message: "This product has existed in the system" });
        else {
            // insert new category if duplicate
            const [categoryExisted] = await Category.getByAttribute("name", payload.categoryName)
            const categoryId = (categoryExisted === undefined) ? uuidv4() : categoryExisted.id
            if (categoryExisted === undefined) {
                const newCategory = new Category(categoryId, payload.categoryName)
                const insertNewCategory = await newCategory.insert()
            }

            // insert new discount if receive new discount
            const discountId = (payload.discount.id === undefined) ? uuidv4() : payload.discount.id
            if (payload.discount.id === undefined) {
                const newDiscount = new Discount(
                    discountId,
                    payload.discount.percent,
                    0,
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
            res.send({ status: 200, data: image });
        }
    };

    static editProduct = async (req, res) => {
        const payload = res.locals.payload;
        if (payload.name !== undefined) {
            const [product] = await Product.getProductsByAttribute("name", payload.name);
            if (product !== undefined && product.id !== payload.productId) {
                res.send({ status: 409, message: "This product has existed in the system" });
                return;
            }
        }

        // insert new category if need
        if (payload.categoryName !== undefined) {
            const [category] = await Category.getByAttribute("name", payload.categoryName);
            const categoryId = category === undefined ? uuidv4() : category.id;

            if (category === undefined) {
                const newCategory = new Category(categoryId, payload.categoryName);
                const insertNewCategory = await newCategory.insert();
            }

            const updateProductCategory = await ProductCategory.updateOneAttribute(
                { key: "productId", value: payload.productId },
                { key: "categoryId", value: categoryId }
            );
            delete payload.categoryName;
        }

        const discountId = payload.discount.id === undefined ? uuidv4() : payload.discount.id;
        if (payload.discount.id === undefined) {
            const newDiscount = new Discount(
                discountId,
                payload.discount.percent,
                0,
                payload.discount.startDate,
                payload.discount.endDate
            );
            const insertNewDiscount = await newDiscount.insert();
        }
        payload.discountId = discountId;
        delete payload.discount;

        const productId = payload.productId;
        delete payload.productId;
        const keys = Object.keys(payload);
        const values = Object.values(payload);
        const updateProduct = await Product.updateAttributes(productId, keys, values);

        res.send({ status: 200 });
    };

    static deleteProduct = async (req, res) => {
        const params = res.locals.params;
        const countParams = Object.keys(params).length;

        if (countParams !== 1 || (countParams === 1 && params.productId === undefined))
            res.send({ status: 400, message: "Params is invalid" });
        else {
            const deleteProduct = await Product.deleteByProductId(params.productId);
            res.send({ status: 200 });
        }
    };
}

export default AdminController;
