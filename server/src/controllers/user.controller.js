import UserInfo from "../utilities/database/entities/UserInfo.js";
import UserLogin from "../utilities/database/entities/UserLogin.js";

class UserController {
    static editProfile = async (req, res) => {
        // this object has {id, username, role}, but we only need id.
        const { id } = res.locals.dataFromToken;
        const dataFromRequest = res.locals.dataFromRequest;
        const [userInfo] = await UserInfo.getAllByAttribute("id", id);

        if (dataFromRequest.hasOwnProperty("phoneNumber") && dataFromRequest.phoneNumber == userInfo.phoneNumber) {
            res.send({ status: 409, message: "This phone number already exists" });
        } else {
            const keys = Object.keys(dataFromRequest);
            const values = Object.values(dataFromRequest);

            let indexOfPasswordAttr = keys.findIndex((attributeName) => attributeName == "password" );
            if (indexOfPasswordAttr != -1) {
                const updatePassword = await UserLogin.updatePassword(
                    id,
                    values[indexOfPasswordAttr]
                );
                keys.splice(indexOfPasswordAttr, 1);
                values.splice(indexOfPasswordAttr, 1);
            }

            const updateUserInfo = await userInfo.update(keys, values)
            res.send({ status: 204 });
        }
    };
}

export default UserController;
