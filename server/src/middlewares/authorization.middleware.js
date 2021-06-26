import jwt from "jsonwebtoken";

class AuthorizationMiddleware {
    static verifyToken = (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.send({ status: 401 });
        }
        else {
            jwt.verify(token, process.env.SECRECT_TOKEN_KEY, (err, data) => {
                if (err) res.send({ status: 403 });
                next()
            })
        }
    };
}

export default AuthorizationMiddleware;