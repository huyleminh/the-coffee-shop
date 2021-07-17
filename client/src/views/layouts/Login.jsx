import { LoadingOutlined } from "@ant-design/icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../assets/css/login.css";
import backgroundImg from "../../assets/images/loginBackground.jpg";
import LoginWorkflow from "../../workflow/LoginWorkflow";

function Login() {
    (() => {
        localStorage.removeItem("user");
        localStorage.removeItem("profile");
    })();

    const history = useHistory();
    const [userDetails, setUserDetails] = useState({ username: "", password: "" });
    const [isSending, setIsSending] = useState(false);

    const handleOnChange = (e) => {
        const target = e.target;
        const { name, value } = target;
        const state = { ...userDetails, [name]: value };
        setUserDetails(state);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        const { username, password } = userDetails;
        const flow = new LoginWorkflow({ username, password });
        const isSuccess = await flow.startLogin();
        if (isSuccess.status === 200) history.push("/");
        else {
            alert(isSuccess.statusText);
            setIsSending(false);
        }
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
            <div className="signin__form">
                <div onClick={handleGoHome}>
                    <FontAwesomeIcon icon={faHome} />
                </div>

                <div className="signin__form__title">
                    <h1>Log In</h1>
                    <b>Become a member of our coffee shop</b>
                </div>

                <div className="signin__form__controll">
                    <form action="">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={userDetails.username}
                            onChange={handleOnChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleOnChange}
                            required
                        />
                        <span style={{ textAlign: "center", fontWeight: "750" }}>
                            Not a member yet?{" "}
                            <a href="/signup" style={{ fontWeight: "750" }}>
                                Sign up
                            </a>
                        </span>
                        <button type="submit" onClick={handleSubmit}>
                            {isSending ? (
                                <LoadingOutlined style={{ fontSize: 24 }} spin />
                            ) : (
                                "LOGIN"
                            )}
                        </button>
                    </form>
                </div>
                <div className="signin__form__bottom">
                    <span>
                        <br />
                        <h3 style={{ textIndent: "1.4em", fontWeight: "750" }}> Or </h3>
                        <div className="signin__IconFbGg">
                            <pre>
                                <a href="/" style={{ color: "blue" }}>
                                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                                </a>
                                <a href="/" style={{ color: "orange" }}>
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
