import ClientAPI from "../ClientAPI";

class ProductAPI {
    static getAllProducts = (params) => {
        return ClientAPI.get(`/products?${params}`);
    };

    static getCategories = () => {
        return ClientAPI.get("/categories");
    }
}

export default ProductAPI;
