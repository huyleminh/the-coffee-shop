import AuthModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
    static postLogin = async (req, res) => {
        const { username, password } = req.body;

        const authModel = new AuthModel();
        const userLoginFromDB = await authModel.getUserLoginByUsername(username);

        if (userLoginFromDB.length == 0) {
            // username is not exists.
            res.send({ status: 404 });
        } else if (userLoginFromDB[0].password !== password) {
            // incorrect password.
            res.send({ status: 401 });
        } else {
            // both username and password are match.
            const role = userLoginFromDB[0].roleID;
            const privateKey = process.env.SECRECT_TOKEN_KEY;
            const token = jwt.sign({ role, username, password }, privateKey, { expiresIn: "0.5h" });

            let expriredIn = new Date();
            expriredIn.setMinutes(expriredIn.getMinutes() + 30);
            expriredIn = expriredIn.valueOf();
            res.send({ status: 200, data: { id: userLoginFromDB[0].id, role, token, expriredIn  } });
        }
    };

    static verifyToken = (req, res) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.send({ status: 401 });
        }
        else {
            jwt.verify(token, process.env.SECRECT_TOKEN_KEY, (err, data) => {
                if (err) res.send({ status: 403 });
                res.send({ status: 200 })
            })
        }
    };
}

export default AuthController;
