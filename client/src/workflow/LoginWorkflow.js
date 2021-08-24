import LoginAPI from "../services/Login/LoginAPI";
import UserValidation from "../utilities/Validate/UserValidation";

export default class LoginWorkflow {
    #_username;
    #_password;

    constructor(props) {
        this.#_username = props.username ? props.username : "";
        this.#_password = props.password ? props.password : "";
    }

    #validateLoginInformation = () => {
        let validateStatus = UserValidation.validateUsername(this.#_username);
        if (!validateStatus.status) return validateStatus;

        validateStatus = UserValidation.validatePassword(this.#_password);
        if (!validateStatus.status) return validateStatus;

        return { status: true };
    };

    startLogin = async () => {
        const validate = this.#validateLoginInformation();
        if (!validate.status) return { status: 400, statusText: validate.error };

        try {
            const response = await LoginAPI.getLoginToken({
                username: this.#_username,
                password: this.#_password,
            });

            if (response.status === 200) {
                const user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                return { status: 200 };
            } else if (response.status === 404) {
                return { status: 400, statusText: "User not found." };
            } else if (response.status === 401) {
                return { status: 400, statusText: "Wrong password." };
            }
        } catch (error) {
            console.log(error);
            return { status: 400, statusText: "Something went wrong." };
        }
    };
}
