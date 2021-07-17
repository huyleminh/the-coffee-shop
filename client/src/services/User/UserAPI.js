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
}

export default UserAPI;
