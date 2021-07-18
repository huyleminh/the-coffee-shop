import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import shortid from "shortid";
import UserInfo from "../utilities/database/entities/UserInfo.js";
import UserLogin from "../utilities/database/entities/UserLogin.js";

dotenv.config();

const generateUserId = (userIdList) => {
    let id;
    while (true) {
        id = shortid.generate();
        id = id.substr(0, 7); // start from 0, length is 7.

        if (userIdList.findIndex((value) => value.id === id) === -1) return id;
    }
};

class AuthController {
    static postLogin = async (req, res) => {
        const { username, password } = req.body;
        const [userLoginFromDB] = await UserLogin.getAllByAttribute("username", username);

        if (userLoginFromDB === undefined) {
            // username is not exists.
            res.send({ status: 404 });
        } else if (userLoginFromDB.password !== password) {
            // incorrect password.
            res.send({ status: 401 });
        } else {
            // both username and password are match.
            const role = userLoginFromDB.role;
            const token = jwt.sign(
                {
                    id: userLoginFromDB.id,
                    username,
                    role,
                },
                process.env.SECRET_TOKEN_KEY,
                { expiresIn: "0.5h" }
            );

            let expiredIn = new Date();
            expiredIn.setMinutes(expiredIn.getMinutes() + 30);
            expiredIn = expiredIn.valueOf();

            res.send({ status: 200, data: { role, token, expiredIn } });
        }
    };

    static verifyToken = (req, res) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.send({ status: 401 });
        } else {
            jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, data) => {
                if (err) res.send({ status: 403 });
                res.send({ status: 200, data: { role: data.role } });
            });
        }
    };

    static postSignup = async (req, res) => {
        const userInfoRequest = req.body;
        const userInfoFromDB = await UserInfo.getAllByUsernameAndPhoneNumber(
            userInfoRequest.username,
            userInfoRequest.phoneNumber
        );

        //Handle missing address key in signup request
        userInfoRequest.address = "";

        if (userInfoFromDB.length !== 0) {
            res.send({ status: 409 });
        } else {
            // create a user id.
            const userIdList = await UserInfo.getAllId();
            const id = generateUserId(userIdList);

            const now = new Date();
            const nowJSONString = now.toJSON();

            // create 2 object UserInfo and UserLogin for a new user.
            const newUserInfo = new UserInfo(
                id,
                userInfoRequest.fullname,
                userInfoRequest.address,
                userInfoRequest.phoneNumber,
                userInfoRequest.gender,
                nowJSONString,
                nowJSONString
            );
            const newUserLogin = new UserLogin(
                id,
                userInfoRequest.username,
                userInfoRequest.password,
                userInfoRequest.role,
                nowJSONString
            );

            // insert a new user to database.
            const insertUserInfoToDB = await newUserInfo.insert();
            const insertUserLoginToDB = await newUserLogin.insert();

            // create an access token for this user
            const token = jwt.sign(
                {
                    id: newUserInfo.id,
                    username: userInfoRequest.username,
                    role: userInfoRequest.role,
                },
                process.env.SECRET_TOKEN_KEY,
                { expiresIn: "0.5h" }
            );

            let expiredIn = new Date();
            expiredIn.setMinutes(expiredIn.getMinutes() + 30);
            expiredIn = expiredIn.valueOf();

            res.send({
                status: 201,
                data: { role: userInfoRequest.role, token, expiredIn },
            });
        }
    };
}

export default AuthController;
