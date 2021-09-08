import React from "react";
import backgroundImg from "../../assets/images/403.png";
import "../../assets/css/403.css";
import { useHistory } from "react-router-dom";

function Forbidden() {
    const history = useHistory();

    // localStorage.removeItem("user");
    // localStorage.removeItem("profile");
    // localStorage.removeItem("checkout");

    const goHome = () => history.push("/");

    const goLogin = () => history.push("/login");

    return (
        <div
            className="fobiddenPage"
            style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: "cover",
            }}
        >
            <div className="returnButtonContainer">
                <div className="returnButtonDivFobidden">
                    <button className="returnButton" onClick={goHome}>
                        Go home
                    </button>
                    <button className="goLoginButton" onClick={goLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Forbidden;
