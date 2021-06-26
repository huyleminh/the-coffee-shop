import AuthModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import shortid from "shortid";

dotenv.config();

class AuthController {
    static postLogin = async (req, res) => {
        const { username, password } = req.body;

        const authModel = new AuthModel();
        const userLoginFromDB = await authModel.getUserLoginByUsername(username);

        if (userLoginFromDB.length === 0) {
            // username is not exists.
            res.send({ status: 404 });
        } else if (userLoginFromDB[0].password !== password) {
            // incorrect password.
            res.send({ status: 401 });
        } else {
            // both username and password are match.
            const role = userLoginFromDB[0].role;
            const privateKey = process.env.SECRECT_TOKEN_KEY;
            const token = jwt.sign({ role, username, password }, privateKey, { expiresIn: "0.5h" });

            let expriredIn = new Date();
            expriredIn.setMinutes(expriredIn.getMinutes() + 30);
            expriredIn = expriredIn.valueOf();
            res.send({ status: 200, data: { id: userLoginFromDB[0].id, role, token, expriredIn } });
        }
    };

    static verifyToken = (req, res) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.send({ status: 401 });
        } else {
            jwt.verify(token, process.env.SECRECT_TOKEN_KEY, (err, data) => {
                if (err) res.send({ status: 403 });
                res.send({ status: 200 });
            });
        }
    };

    static postSignup = async (req, res) => {
        const userInfoRequest = req.body;

        const authModel = new AuthModel();
        const userInfoFromDB = await authModel.getUserInfoByUsernameAndPhoneNumber(
            userInfoRequest.username,
            userInfoRequest.phoneNumber
        );

        if (userInfoFromDB.length === 0) {
            const privateKey = process.env.SECRECT_TOKEN_KEY;
            const token = jwt.sign(
                {
                    role: userInfoRequest.role,
                    username: userInfoRequest.username,
                    password: userInfoRequest.password,
                },
                privateKey,
                { expiresIn: "0.5h" }
            );

            let expiredIn = new Date();
            expiredIn.setMinutes(expiredIn.getMinutes() + 30);
            expiredIn = expiredIn.valueOf();

            let id;
            const idList = await authModel.getAllId();
            while (true) {
                id = shortid.generate();
                id = id.substr(0, 7); // start from 0, length is 7.

                if (idList.findIndex((value) => value.id === id) === -1) break;
            }

            // insert a new user to database.
            const insertUserInfoToDB = await authModel.insertUserInfo(
                id,
                userInfoRequest.fullname,
                userInfoRequest.address,
                userInfoRequest.phoneNumber,
                userInfoRequest.gender
            );
            const insertUserLoginToDB = await authModel.insertUserLogin(
                id,
                userInfoRequest.username,
                userInfoRequest.password,
                userInfoRequest.role
            );

            res.send({
                status: 201,
                data: {
                    id,
                    role: userInfoRequest.role,
                    token,
                    expiredIn,
                },
            });
        } else {
            res.send({ status: 409 });
        }
    };
}

export default AuthController;
