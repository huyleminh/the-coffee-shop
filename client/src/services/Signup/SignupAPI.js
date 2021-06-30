import ClientAPI from "../ClientAPI";

class SignupAPI {
    static getSignupToken = (props) => {
        const { username, password, fullname, address, phoneNumber, gender, role } = props;
        //need somes expression to modify fiels before sending to be
        return ClientAPI.post("/auth/signup", { username, password, fullname, address, phoneNumber, gender, role });
    };
}

export default SignupAPI;
