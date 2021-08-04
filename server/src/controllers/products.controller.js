import Product from "../utilities/database/entities/Product.js";
import { MAX_PRODUCTS_PER_PAGE } from "../utilities/constants.js";

class ProductsController {
    static getProducts = async (req, res) => {
        const params = res.locals.params;

        let productList = undefined;
        if (params.page === undefined) params.page = 1;
        else params.page = parseInt(params.page);

        if (params.search !== undefined) productList = await Product.searchProducts(params.search);
        else if (params.filter !== undefined)
            productList = await Product.filterProducts(params.filter);
        else productList = await Product.getProducts();

        const totalProducts = productList.length;
        let totalPages = Math.ceil(totalProducts / MAX_PRODUCTS_PER_PAGE);
        if (totalPages === 0) totalPages = 1;

        if (params.page < 1 || params.page > totalPages) {
            res.send({ status: 404, message: "Page not found" });
            return;
        }

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
                },
                categoryName: product.categoryName,
                rating: {
                    totalStar: product.totalStar,
                    totalRating: product.totalRating,
                },
                discount,
            };
        });

        const start = (params.page - 1) * MAX_PRODUCTS_PER_PAGE;
        const pagination = {
            page: params.page,
            limit: MAX_PRODUCTS_PER_PAGE,
            total: totalProducts,
        };

        res.send({
            status: 200,
            data: {
                products: products.slice(start, start + pagination.limit),
                pagination,
            },
        });
    };
}

export default ProductsController;
