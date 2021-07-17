import jwt from "jsonwebtoken";
import UserInfo from "../utilities/database/entities/UserInfo.js";
import UserLogin from "../utilities/database/entities/UserLogin.js";

class AuthorizationMiddleware {
    static verifyToken = (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.send({ status: 401 });
        } else {
            jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, data) => {
                if (err) {
                    res.send({ status: 403, message: err.message });
                    return;
                }

                res.locals.token = data;
                res.locals.payload = req.body
                res.locals.params = req.query

                next();
            });
        }
    };

    static verifyInfoInToken = async (req, res, next) => {
        // if data in the token is correct,
        // then payload is an object that contains: { id, username, role }
        const { iat, exp, ...payloadInToken } = res.locals.token

        if (
            Object.keys(payloadInToken).length === 3 &&
            payloadInToken.id !== undefined &&
            payloadInToken.username !== undefined &&
            payloadInToken.role !== undefined
        ) {
            const [userInfo] = await UserInfo.getAllByAttribute("id", payloadInToken.id);
            const [userLogin] = await UserLogin.getAllByAttribute("id", payloadInToken.id);

            // payloadInToken contains incorrect information
            if (
                (userInfo === undefined || userLogin === undefined) ||
                (userLogin.username !== payloadInToken.username || userLogin.role !== payloadInToken.role)
            ) {
                res.send({ status: 404, message: "This user does not exist" });
                return;
            }

            res.locals.userInfo = userInfo
            res.locals.userLogin = userLogin
            next()
            return;
        }

        res.send({ status: 401, message: "Lack of information in the token" })
    };
}

export default AuthorizationMiddleware;
