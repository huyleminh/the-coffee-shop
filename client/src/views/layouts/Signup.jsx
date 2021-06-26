import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router-dom";
import "../../assets/css/signup.css";

function Signup() {
    const history = useHistory();

    const handleSubmit = (e) => {
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
                    <h1>Sign Up</h1>
                    <span>Become a member of our coffee shop</span>
                </div>

                <div className="form__controll">
                    <form action="">
                        <input
                            type="text"
                            placeholder="Fullname"
                            autoFocus={true}
                            name="fullname"
                            required
                        />
                        <select name="" id="gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <input type="text" placeholder="Phone number" name="phone" required />
                        <input type="text" placeholder="Address" name="address" required />
                        <input type="text" placeholder="Username" name="username" required />
                        <input type="password" placeholder="Password" name="password" required />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            name="confirm"
                            required
                        />

                        <span style={{ textAlign: "center" }}>
                            Already have an account? <a href="/login">Login</a>
                        </span>
                        <button type="submit" onClick={handleSubmit}>
                            SIGNUP
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
