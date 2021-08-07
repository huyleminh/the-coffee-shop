import Product from "../utilities/database/entities/Product.js"

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
       
        res.send({
            status: 200,
            data: products,
        });
    }

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
    }

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
    }

    static deleteProduct = async (req, res) => {
        const params = res.locals.params
        const countParams = Object.keys(params).length

        if (countParams !== 1 || (countParams === 1 && params.productId === undefined))
            res.send({ status: 400, message: "Params is invalid" })
        else {
            const deleteProduct = await Product.deleteByProductId(params.productId)
            res.send({ status: 200 })
        }
    }
}

export default AdminController
