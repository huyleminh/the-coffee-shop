import UserValidation from "../utilities/Validate/UserValidation";
import CheckoutAPI from "../services/Checkout/CheckoutAPI";

class CheckoutWorkflow {
    #name;
    #phoneNumber;
    #deliveryAddress;
    #products;
    #isPaid = 0;
    #payMethod;
    constructor(props) {
        this.#name = props.name ? props.name : "";
        this.#phoneNumber = props.phoneNumber ? props.phoneNumber : "";
        this.#deliveryAddress = props.address
            ? props.address
            : "undefined&&undefined&&undefined&&undefined";
        this.#products = props.products ? props.products : [];
        this.#payMethod = props.payment === "cod" ? 0 : 1;
    }

    #validateInformation = () => {
        let validateStatus = UserValidation.validateFullname(this.#name);
        if (!validateStatus.status) return validateStatus;

        validateStatus = UserValidation.validatePhoneNumber(this.#phoneNumber);
        if (!validateStatus.status) return validateStatus;

        return { status: true };
    };

    startFlow = async () => {
        const validate = this.#validateInformation();
        if (!validate.status) return { status: 400, statusText: validate.error };

        try {
            const token = JSON.parse(localStorage.getItem("user")).token;
            const response = await CheckoutAPI.createNewOrder(token, {
                products: this.#products,
                isPaid: this.#isPaid,
                payMethod: this.#payMethod,
                deliveryAddress: this.#deliveryAddress,
                name: this.#name,
                phoneNumber: this.#phoneNumber,
            });

            if (response.status === 200) {
                return {
                    status: 200,
                    statusText:
                        "Create order successfully. You will be automatically redirected to the menu. Our employees will confirm your order soon.",
                };
            } else if (response.status === 404) {
                return {
                    status: 404,
                    statusText: response.message,
                };
            } else if (response.status === 401 || response.status === 403) {
                return {
                    status: 403,
                    statusText:
                        "You are not logged in or your session has expired. You will be automatically redirected to the login page.",
                };
            }
        } catch (error) {
            console.log(error);
            return { status: 400, statusText: "Something went wrong." };
        }
    };
}

export default CheckoutWorkflow;
