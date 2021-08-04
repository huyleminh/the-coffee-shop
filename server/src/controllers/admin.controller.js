import Product from "../utilities/database/entities/Product.js"

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
