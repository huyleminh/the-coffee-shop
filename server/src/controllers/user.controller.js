import UserInfo from "../utilities/database/entities/UserInfo.js";
import UserLogin from "../utilities/database/entities/UserLogin.js";

class UserController {
    static getProfile = async (req, res) => {
        const { id } = res.locals.dataFromToken;
        const [userInfo] = await UserInfo.getAllByAttribute("id", id);
        const [userLogin] = await UserLogin.getAllByAttribute("id", id);

        if (userInfo === undefined || userLogin === undefined) {
            res.send({ status: 404, message: "This user does not exist" });
            return;
        }

        res.send({
            status: 200,
            data: {
                userInfo: userInfo.cloneExceptAttributes(["id"]),
                userLogin: userLogin.cloneExceptAttributes(["id", "createdAt"])
            }
        });
    }

    static editProfile = async (req, res) => {
        // this object has {id, username, role}, but we only need id.
        const { id } = res.locals.dataFromToken;
        const dataFromRequest = res.locals.dataFromRequest;
        const [userNeedEdit] = await UserInfo.getAllByAttribute("id", id);

        if (userNeedEdit === undefined) {
            res.send({ status: 404, message: "This user does not exist" });
            return;
        }

        const phoneNumber = dataFromRequest["phoneNumber"]
        if (phoneNumber !== undefined) {
            const [user] = await UserInfo.getAllByAttribute("phoneNumber", phoneNumber);
            if (user !== undefined && user.id !== userNeedEdit.id) {
                res.send({ status: 409, message: "This phone number already exists" });
                return;
            }
        }

        const newPassword = dataFromRequest["password"];
        if (newPassword !== undefined) {
            const updatePassword = await UserLogin.updatePassword(id, newPassword);
            delete dataFromRequest["password"];
        }

        const updateUserInfo = await userNeedEdit.update(
            Object.keys(dataFromRequest),
            Object.values(dataFromRequest)
        )
        res.send({ status: 204 });
    };
}

export default UserController;
