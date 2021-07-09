import AuthModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
    static postLogin = async (req, res) => {
        const { username, password } = req.body;

        const authModel = new AuthModel();
        const userLoginFromDB = await authModel.getUserLoginByUsername(username);

        if (userLoginFromDB.length == 0) { // username is not exists.
            res.send({ status: 404 });
        } else if (userLoginFromDB[0].PASSWORD !== password) { // incorrect password.
            res.send({ status: 401 });
        } else { // both username and password are match.
            const role = userLoginFromDB[0].ROLE_ID;
            const privateKey = process.env.SECRECT_TOKEN_KEY;
            const token = jwt.sign({ role, username, password }, privateKey, { expiresIn: "0.5h" });

            res.send({ status: 200, data: { token } });
        }
    };
}

export default AuthController;
