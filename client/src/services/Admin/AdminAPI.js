import ClientAPI from "../ClientAPI";

class AdminAPI {
    static getAllProducts = (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.get("/admin/products/get", config);
    };

    static createNewProduct = (token, props) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.post("/admin/product/create", { ...props }, config);
    };

    static updateProductById = (token, props) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.post("/admin/product/edit", { ...props }, config);
    };

    static deleteProductById = (token, params) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.delete(`/admin/product/delete?${params}`, config);
    };
}

export default AdminAPI;
