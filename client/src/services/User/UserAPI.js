import ClientAPI from "../ClientAPI";

class UserAPI {
    static getUserProfile = (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.get("/user/profile/get", config);
    };

    static changeProfile = (token, props) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.patch("/user/profile/edit", { ...props }, config);
    };

    static getOrdersHistory = (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.get("/order/view-history", config);
    };

    static cancelOrder = (token, orderId) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.post("/order/cancel", { orderId }, config);
    };
}

export default UserAPI;
