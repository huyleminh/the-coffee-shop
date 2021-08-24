import ClientAPI from "../ClientAPI";

class SignupAPI {
    static getSignupToken = (props) => {
        const { username, password, fullname, phoneNumber, gender } = props;
        //need somes expression to modify fiels before sending to be
        return ClientAPI.post("/auth/signup", {
            username,
            password,
            fullname,
            phoneNumber,
            gender,
            role: 3, //3:customer
        });
    };
}

export default SignupAPI;
