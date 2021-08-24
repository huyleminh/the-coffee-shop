import axios from "axios";
import EnvironmentConst from "../shared/EnvironmentConst";

const ClientAPI = axios.create({
    baseURL: EnvironmentConst.API_DOMAIN,
    headers: {
        "Content-Type": "application/json",
    },
});

ClientAPI.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
ClientAPI.interceptors.response.use(
    function (response) {
        // code, statusText, ..., data
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (response && response.status === 200)
            return response.data;
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default ClientAPI;
