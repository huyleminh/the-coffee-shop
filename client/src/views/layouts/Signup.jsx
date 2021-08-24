import { LoadingOutlined } from "@ant-design/icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../assets/css/signup.css";
import backgroundImg from "../../assets/images/loginBackground.jpg";
import NotificationBox from "../../components/NotificationBox";
import SignupWorkflow from "../../workflow/SignupWorkflow";

function Signup() {
    const history = useHistory();
    const [userInfo, setUserInfo] = useState({
        fullname: "",
        gender: "male",
        phoneNumber: "",
        username: "",
        password: "",
        confirm: "",
    });
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const newuser = { ...userInfo, [name]: target.value };
        setUserInfo(newuser);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        const { username, password, fullname, phoneNumber, gender, confirm } = userInfo;
        const flow = new SignupWorkflow({
            username,
            password,
            fullname,
            phoneNumber,
            gender,
            confirm,
        });

        const signupResponse = await flow.startSignup();

        if (signupResponse.status === 400) {
            setIsSending(false);
            alert(signupResponse.statusText);
        } else if (signupResponse.status === 201) {
            history.push("/");
            setTimeout(() => {
                NotificationBox.triggerSuccess("SIGNUP SUCCESS", "Register successfully.");
            }, 800);
        }
    };

    const handleGoHome = () => history.push("/");

    useEffect(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("profile");
        localStorage.removeItem("checkout");
    }, []);

    return (
        <div
            className="signup"
            style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: "cover",
            }}
        >
            <div className="form">
                <div onClick={handleGoHome}>
                    <FontAwesomeIcon icon={faHome} title="Go Home" />
                </div>

                <div className="form__title">
                    <h1>Sign Up</h1>
                    <span>Become a member of our coffee shop</span>
                </div>

                <div className="form__controll">
                    <form action="">
                        <input
                            type="text"
                            placeholder="Full name"
                            autoFocus={true}
                            name="fullname"
                            required
                            value={userInfo.fullname}
                            onChange={handleChange}
                        />
                        <select name="gender" id="gender" onChange={handleChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Phone number"
                            name="phoneNumber"
                            required
                            value={userInfo.phoneNumber}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            required
                            value={userInfo.username}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                            value={userInfo.password}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            name="confirm"
                            required
                            value={userInfo.confirm}
                            onChange={handleChange}
                        />

                        <span style={{ textAlign: "center" }}>
                            Already have an account? <a href="/login">Login</a>
                        </span>
                        <button type="submit" onClick={handleSubmit}>
                            {isSending ? (
                                <LoadingOutlined style={{ fontSize: 24 }} spin />
                            ) : (
                                "SIGNUP"
                            )}
                        </button>
                    </form>
                </div>

                <div className="policy">
                    <span>
                        By clicking up the SIGNUP button, you agree to our
                        <br />
                        <a href="/">Terms &amp; Conditions</a> and <a href="/">Privacy Policy</a>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Signup;
