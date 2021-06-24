import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../assets/css/login.css";
import backgroundImg from "../../assets/images/loginBackground.jpg";

function Login() {
    const history = useHistory();

    const [userDetails, setUserDetails] = useState({ username: "", password: "" });

    const verifyInput = (username, password) => {
        if (username === "" || password === "") {
            console.log("LOGIN INFO ERROR");
        }
    };

    const onChangeUsername = (e) => {
        const user = e.target.value;
        const state = { ...userDetails, username: user };
        setUserDetails(state);
    };

    const onChangePassword = (e) => {
        const passwordValue = e.target.value;
        const state = { ...userDetails, password: passwordValue };
        setUserDetails(state);
    };

    const adminUser = {
        username: "admin",
        password: "admin",
    };

    const handleSubmit = (e) => {
        console.log(e.target.value);
        console.log("clicked");
    };

    const handleGoHome = () => {
        history.push("/");
    };

    return (
        <div
            className="signin"
            style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: "cover",
            }}
        >
            <div className="form">
                <div onClick={handleGoHome}>
                    <FontAwesomeIcon icon={faHome} />
                </div>

                <div className="form__title">
                    <h1>Log In</h1>
                    <b>Become a member of our coffee shop</b>
                </div>

                <div className="form__controll">
                    <form action="">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={userDetails.username}
                            onChange={onChangeUsername}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={userDetails.password}
                            onChange={onChangePassword}
                            required
                        />
                        <span style={{ textAlign: "center", fontWeight: "750" }}>
                            Not a member yet?{" "}
                            <a href="/signup" style={{ fontWeight: "750" }}>
                                Sign up
                            </a>
                        </span>
                        <button type="submit" onClick={handleSubmit}>
                            LOGIN
                        </button>
                    </form>
                </div>
                <div className="form__bottom" id="form__bot">
                    <span>
                        <br />
                        <h3 style={{ textIndent: "2em", fontWeight: "750" }}> Or </h3>
                        <div className="IconFbGg">
                            <pre>
                                <a href="#" style={{ color: "blue" }}>
                                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                                </a>
                                <text> </text>
                                <a href="#" style={{ color: "orange" }}>
                                    <FontAwesomeIcon icon={faGoogle} size="2x" />
                                </a>
                            </pre>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;
