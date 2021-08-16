import UserValidation from "../utilities/Validate/UserValidation";
import CheckoutAPI from "../services/Checkout/CheckoutAPI";

class CheckoutWorkflow {
    #fullname;
    #phoneNumber;
    #deliveryAddress;
    #products;
    #payMethod;
    #deliveryFee;
    constructor(props) {
        this.#fullname = props.name ? props.name : "";
        this.#phoneNumber = props.phoneNumber ? props.phoneNumber : "";
        this.#deliveryAddress = props.address ? props.address : "";
        this.#products = props.products ? props.products : [];
        this.#payMethod = props.payment ? props.payment : 0;
        this.#deliveryFee = props.deliveryFee ? props.deliveryFee : 5000;
    }

    #validateInformation = () => {
        let validateStatus = UserValidation.validateFullname(this.#fullname.trim());
        if (!validateStatus.status) return validateStatus;

        validateStatus = UserValidation.validatePhoneNumber(this.#phoneNumber.trim());
        if (!validateStatus.status) return validateStatus;

        console.log(this.#deliveryAddress);
        if (this.#deliveryAddress === "" || this.#deliveryAddress.match(/^\s+$/g))
            return { status: false, error: "Please input delivery address." };

        return { status: true };
    };

    startFlow = async () => {
        const validate = this.#validateInformation();
        if (!validate.status) return { status: 400, statusText: validate.error };

        try {
            const total = this.#products.reduce(
                (accumulator, current) => accumulator + current.price * current.quantity,
                0
            );

            const token = JSON.parse(localStorage.getItem("user")).token;
            const response = await CheckoutAPI.createNewOrder(token, {
                products: this.#products,
                isPaid: this.#payMethod === 0 ? 0 : 1,
                payMethod: this.#payMethod,
                deliveryFee: this.#deliveryFee,
                totalProducts: this.#products.length,
                totalPrice: total,
                receiverInfo: {
                    fullname: this.#fullname.trim(),
                    address: this.#deliveryAddress.trim(),
                    phoneNumber: this.#phoneNumber.trim(),
                },
            });

            if (response.status === 200) {
                return {
                    status: 200,
                    statusText:
                        "Create order successfully. You will be automatically redirected to the order history in order to cancel the order if you want. Our employees will confirm your order soon.",
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
