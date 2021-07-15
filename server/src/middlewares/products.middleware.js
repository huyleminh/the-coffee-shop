class ProductsMiddleware {
    static verifyParams = (req, res, next) => {
        const params = req.query;
        const countParams = Object.keys(params).length;

        if (
            (params.page !== undefined &&
                params.page !== "" &&
                params.limit !== undefined &&
                params.limit !== "") ||
            (params.page !== undefined && params.limit !== undefined)
        ) {
            if (
                countParams === 0 ||
                countParams === 2 ||
                ((countParams === 1 || countParams === 3) &&
                    (params.search !== undefined || params.filter !== undefined))
            ) {
                res.locals.params = params;
                next();
                return;
            }
        }

        res.send({ status: 404, message: "Page not found" });
    };
}

export default ProductsMiddleware;
