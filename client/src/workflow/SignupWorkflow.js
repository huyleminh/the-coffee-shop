import SignupAPI from "../services/Signup/SignupAPI";
import UserValidation from "../utilities/Validate/UserValidation";

export default class SignupWorkflow {
    #_username;
    #_password;
    #_confirmPassword;
    #fullname;
    #phoneNumber;
    #gender;
    #role;

    constructor(props) {
        this.#_username = props.username ? props.username : "";
        this.#_password = props.password ? props.password : "";
        this.#_confirmPassword = props.confirm ? props.confirm : "";
        this.#fullname = props.password ? props.fullname : "";
        this.#phoneNumber = props.phoneNumber ? props.phoneNumber : "";
        this.#gender = props.gender ? props.gender : "";
        this.#role = 3; //props.role ? props.role : "";
    }

    #validateSignupInformation = () => {
        let validateStatus = UserValidation.validateUsername(this.#_username);
        if (!validateStatus.status) return validateStatus;

        validateStatus = UserValidation.validatePassword(this.#_password);
        if (!validateStatus.status) return validateStatus;

        if (this.#_password !== this.#_confirmPassword) {
            return { status: false, error: "Incorrect confirm password." };
        }

        validateStatus = UserValidation.validatePhoneNumber(this.#phoneNumber);
        if (!validateStatus.status) return validateStatus;

        validateStatus = UserValidation.validateFullname(this.#fullname);
        if (!validateStatus.status) return validateStatus;

        return { status: true };
    };

    startSignup = async () => {
        const validate = this.#validateSignupInformation();
        console.log(validate);
        if (!validate.status) return { status: 400, statusText: validate.error };

        try {
            console.log("ok 47");
            const response = await SignupAPI.getSignupToken({
                username: this.#_username,
                password: this.#_password,
                fullname: this.#fullname,
                phoneNumber: this.#phoneNumber,
                gender: this.#gender === "male" ? 0 : 1,
            });

            console.log(response);

            if (response.status === 201) {
                const user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                return { status: 201 };
            } else if (response.status === 409) {
                return { status: 400, statusText: "User existed." };
            }
        } catch (error) {
            console.log(error);
            return { status: 400, statusText: "Something went wrong." };
        }
    };
}
