import jwt from "jsonwebtoken";

class AuthorizationMiddleware {
    static verifyToken = (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.send({ status: 401 });
        } else {
            jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, data) => {
                if (err) res.send({ status: 403, message: err.message });

                res.locals.dataFromToken = data;
                res.locals.dataFromRequest = req.body;
                next();
            });
        }
    };
}

export default AuthorizationMiddleware;
