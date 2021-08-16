import UserValidation from "../utilities/Validate/UserValidation";
import UserAPI from "../services/User/UserAPI";

export class ChangeProfileWorkflow {
    #fullname;
    #phoneNumber;
    #address;
    ward;
    district;
    city;
    #gender;

    constructor(props) {
        this.#fullname = props.fullname ? props.fullname : "";
        this.#phoneNumber = props.phoneNumber ? props.phoneNumber : "";
        this.#address = props.address ? props.address : "undefined";
        this.ward = props.ward ? props.ward : "undefined";
        this.district = props.district ? props.district : "undefined";
        this.city = props.city ? props.city : "undefined";
        this.#gender = props.gender;
    }

    #validateProfile = () => {
        let validateStatus = UserValidation.validateFullname(this.#fullname.trim());
        if (!validateStatus.status) return validateStatus;

        validateStatus = UserValidation.validatePhoneNumber(this.#phoneNumber.trim());
        if (!validateStatus.status) return validateStatus;

        this.#address = `${this.#address}&&${this.ward}&&${this.district}&&${this.city}`;
        delete this.ward;
        delete this.district;
        delete this.city;

        this.#gender = this.#gender === "male" ? 0 : 1;

        return { status: true };
    };

    startFlow = async () => {
        const validate = this.#validateProfile();
        if (!validate.status) return { status: 400, statusText: validate.error };

        try {
            const token = JSON.parse(localStorage.getItem("user")).token;
            const response = await UserAPI.changeProfile(token, {
                fullname: this.#fullname.trim(),
                phoneNumber: this.#phoneNumber.trim(),
                address: this.#address.trim(),
                gender: this.#gender,
            });

            switch (response.status) {
                case 204:
                    return { status: 204, statusText: "Change information successfully." };
                case 401:
                    return { status: 401, statusText: "Unauthorized." };
                case 403:
                    return { status: 403, statusText: response.message };
                case 404:
                    return { status: 404, statusText: response.message };
                case 409:
                    return { status: 409, statusText: response.message };
                default:
                    console.log(response);
                    return { status: 400, statusText: "Something went wrong." };
            }
        } catch (error) {
            console.log(error);
            return { status: 400, statusText: "Something went wrong." };
        }
    };
}

export class ChangeSecurityWorkflow {
    #password;
    #newPassword;
    #confirmPassword;

    constructor(props) {
        this.#password = props.password ? props.password : "";
        this.#newPassword = props.newPassword ? props.newPassword : "";
        this.#confirmPassword = props.confirmPassword ? props.confirmPassword : "";
    }

    #validateSecurity = () => {
        let validateStatus = UserValidation.validatePassword(this.#password);
        if (!validateStatus.status) return validateStatus;

        validateStatus = UserValidation.validatePassword(this.#newPassword);
        if (!validateStatus.status) return validateStatus;

        if (this.#newPassword === this.#password)
            return {
                status: false,
                error: "New password is the same as the old one.",
            };
        else {
            if (this.#newPassword !== this.#confirmPassword)
                return {
                    status: false,
                    error: "Confirm password does not match.",
                };
        }

        return { status: true };
    };

    startFlow = async () => {
        const validate = this.#validateSecurity();
        console.log("validate:", validate);
        if (!validate.status) return { status: 400, statusText: validate.error };

        try {
            const token = JSON.parse(localStorage.getItem("user")).token;
            const response = await UserAPI.changeProfile(token, {
                newPassword: this.#newPassword,
                password: this.#password,
            });

            switch (response.status) {
                case 204:
                    return { status: 204, statusText: "Change password successfully." };
                case 401:
                    return { status: 401, statusText: "Unauthorized." };
                case 403:
                    return { status: 403, statusText: response.message };
                case 404:
                    return { status: 404, statusText: response.message };
                case 409:
                    return { status: 409, statusText: response.message };
                default:
                    console.log(response);
                    return { status: 400, statusText: "Something went wrong." };
            }
        } catch (error) {
            console.log(error);
            return { status: 400, statusText: "Something went wrong." };
        }
    };
}
