import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router-dom";
import "../../assets/css/login.css";

function Signin() {
    const history = useHistory();

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
        <div className="signup">
            <div className="form">
                <div onClick={handleGoHome}>
                    <FontAwesomeIcon icon={faHome} />
                </div>

                <div className="form__title">
                    <h1>Sign In</h1>
                    <span>Become a member of our coffee shop</span>
                </div>

                <div className="form__controll">
                    <form action="">
                        <input type="text" placeholder="Username" name="username" required />
                        <input type="password" placeholder="Password" name="password" required />
                        <button type="submit" onClick={handleSubmit}>
                            SIGNIN
                        </button>
                    </form>
                </div>

                <div className="policy">
                    <span>
                        By clicking up the SIGNIN button, you agree to our
                        <br />
                        <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Signin;
