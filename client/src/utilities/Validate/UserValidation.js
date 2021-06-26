export default class UserValidation {
    static validateUsername = (username) => {
        if (!username || username.length === 0 || username.length < 8)
            return { status: false, error: "Username must be at least 8 charaters." };

        const usernameRegex = /^([a-zA-Z]+)((_[a-zA-Z\d]+)|[a-zA-Z\d])+$/g;
        if (username.match(usernameRegex)) {
            return { status: true };
        } else
            return {
                status: false,
                error: "Username must begin with a letter and not contain special character.",
            };
    };

    static validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
        if (password.match(passwordRegex)) return { status: true };
        else
            return {
                status: false,
                error: "Password must be at least 8 letters and one number.",
            };
    };
}
