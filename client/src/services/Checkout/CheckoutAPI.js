import ClientAPI from "../ClientAPI";

class CheckoutAPI {
    static getUserInformation = (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.get("/checkout/get", config);
    };

    static createNewOrder = (token, props) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.post("/checkout/confirm", { ...props }, config);
    };
}

export default CheckoutAPI;
