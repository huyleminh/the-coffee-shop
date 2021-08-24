import ClientAPI from "../ClientAPI";

class EmployeeAPI {
    static getAllOrders = (token, params) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.get(`/employee/view-orders?${params}`, config);
    };

    static verifyOrderById = (token, props) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.post("/employee/verify-order", { ...props }, config);
    };
}

export default EmployeeAPI;
