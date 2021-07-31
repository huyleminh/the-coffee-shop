import ClientAPI from "../ClientAPI";

class LoginAPI {
    static getLoginToken = ({ username, password }) => {
        return ClientAPI.post("/auth/login", { username, password });
    };

    static verifyAccessToken = (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return ClientAPI.get("/auth/verify", config);
    };
}

export default LoginAPI;
