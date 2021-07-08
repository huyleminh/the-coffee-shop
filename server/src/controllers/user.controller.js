import UserModel from "../models/user.model.js";

class UserController {
    static editProfile = async (req, res) => {
        // this object has {id, username, role}, but we only need id.
        const { id } = res.locals.dataFromToken;

        const dataFromRequest = res.locals.dataFromRequest;
        const userModel = new UserModel();

        if (dataFromRequest.hasOwnProperty("phoneNumber")) {
            // the return value is an array.
            // but 'phoneNumber' column has unique values, this array has at most one element.
            const [userInfoList] = await userModel.getUserInfoByAttribute(
                "phoneNumber",
                dataFromRequest.phoneNumber
            );

            if (userInfoList != undefined && userInfoList.id != id) {
                res.send({ status: 409, message: "This phone number already exists" });
                return;
            }
        }

        const keys = Object.keys(dataFromRequest);
        const values = Object.values(dataFromRequest);

        let indexOfPasswordAttr = keys.findIndex((attributeName) => attributeName == "password");
        if (indexOfPasswordAttr != -1) {
            const updatePassword = await userModel.updatePasswordForUserLogin(
                id,
                values[indexOfPasswordAttr]
            );
            keys.splice(indexOfPasswordAttr, 1);
            values.splice(indexOfPasswordAttr, 1);
        }

        const updateUserInfo = await userModel.updateUserInfoByAttributes(id, keys, values);
        res.send({ status: 204 });
    };
}

export default UserController;
