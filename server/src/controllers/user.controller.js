import UserInfo from "../utilities/database/entities/UserInfo.js";
import UserLogin from "../utilities/database/entities/UserLogin.js";

class UserController {
    static getProfile = (req, res) => {
        const userInfo = res.locals.userInfo
        const userLogin = res.locals.userLogin

        res.send({
            status: 200,
            data: {
                userInfo: userInfo.cloneExceptAttributes(["id"]),
                userLogin: userLogin.cloneExceptAttributes(["id", "password"]),
            },
        });
    };

    static editProfile = async (req, res) => {
        const userInfo = res.locals.userInfo
        const userLogin = res.locals.userLogin
        const payload = res.locals.payload  // information are send from client.


        const oldPassword = payload["password"]
        let hasEditPassword = false
        if (oldPassword !== undefined) {
            if (oldPassword !== userLogin.password) {
                res.send({ status: 409, message: "Password is incorrect" })
                return
            }
            hasEditPassword = true
        }

        const phoneNumber = payload["phoneNumber"]
        if (phoneNumber !== undefined) {
            const [user] = await UserInfo.getAllByAttribute("phoneNumber", phoneNumber);
            if (user !== undefined && user.id !== userInfo.id) {
                res.send({ status: 409, message: "This phone number already exists" });
                return;
            }
        }


        if (hasEditPassword) {
            const updatePassword = await userLogin.update(
                ["password"],
                [payload["newPassword"]]
            )
            delete payload["newPassword"];
            delete payload["password"];
        }

        if (Object.keys(payload).length !== 0) {
            const updateUserInfo = await userInfo.update(
                Object.keys(payload),
                Object.values(payload)
            )
        }

        res.send({ status: 204 });
    };
}

export default UserController;
