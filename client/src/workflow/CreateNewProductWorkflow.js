import AdminAPI from "../services/Admin/AdminAPI";
class CreateNewProductWorkflow {
    #name;
    #image;
    #description;
    #price;
    #categoryName;
    #discount;
    constructor(props) {
        this.#name = props.name;
        this.#image = props.image ? props.image : null;
        this.#description = props.description;
        this.#price = props.price;
        this.#categoryName = props.categoryName;
        this.#discount = props.discount;
    }

    #validateInformation = () => {
        if (this.#name === "" || this.#name.match(/^\s+$/g))
            return { status: false, statusText: "Please input product's name." };
        if (this.#categoryName === "" || this.#categoryName.match(/^\s+$/g))
            return { status: false, statusText: "Please input product's category." };
        if (!this.#price || parseFloat(this.#price) <= 0)
            return { status: false, statusText: "Price must be larger than 0." };
        if (this.#discount && this.#discount && parseFloat(this.#discount.percent) <= 0)
            return { status: false, statusText: "Discount must be larger than 0." };
        return { status: true };
    };

    startFlow = async () => {
        const validateStatus = this.#validateInformation();
        if (!validateStatus.status) return { status: 400, statusText: validateStatus.statusText };
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            localStorage.removeItem("user");
            return { status: 403, statusText: "You are not allowed to access this page." };
        }

        const newInformation = {
            name: this.#name.trim(),
            description: this.#description.trim(),
            price: this.#price,
            categoryName: this.#categoryName.trim().toLowerCase(),
            discount: this.#discount,
        };
        if (this.#image)
            newInformation.image = this.#image.match(/(\.jpg)|(\.png)|(\.jpeg)|(\.jfif)/g);
        newInformation.categoryName =
            newInformation.categoryName[0].toUpperCase() + newInformation.categoryName.slice(1);
        console.log(newInformation);
        try {
            const response = await AdminAPI.createNewProduct(user.token, { ...newInformation });
            if (response.status === 200) {
                return response;
            } else if (
                response.status === 401 ||
                response.status === 403 ||
                response.status === 404
            ) {
                return { status: 403, statusText: "You are not allowed to access this page." };
            } else if (response.status === 409) {
                return { status: 409, statusText: response.message };
            }
        } catch (error) {
            console.log(error);
            return { status: 400, statusText: "Something went wrong." };
        }
    };
}

export default CreateNewProductWorkflow;
