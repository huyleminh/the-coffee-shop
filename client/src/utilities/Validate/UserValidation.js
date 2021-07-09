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

    static validateFullname = (fullname) => {
        const fullnameRegex =
            /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_])+$/gi;
        console.log(fullname);
        console.log(fullname.match(fullnameRegex));
        if (fullname.match(fullnameRegex)) return { status: true };
        else
            return {
                status: false,
                error: "Invalid name format.",
            };
    };

    static validatePhoneNumber = (phoneNumber) => {
        if (isNaN(phoneNumber) !== false) {
            //not a number
            return {
                status: false,
                error: "Phone number do not accept character",
            };
        } else if (phoneNumber[0] !== "0") {
            return {
                status: false,
                error: "Phone number identification must start with 0",
            };
        } else if (phoneNumber.length !== 10) {
            return {
                status: false,
                error: "Phone number can only be 10 numbers",
            };
        } else {
            return { status: true };
        }
    };
}
