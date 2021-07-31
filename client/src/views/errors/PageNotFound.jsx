import React from "react";
import backgroundImg from "../../assets/images/404.png";
import "../../assets/css/404.css";
import { useHistory } from "react-router-dom";

function NotFound(props) {
    const history = useHistory();

    const goHome = () => {
        history.push("/");
    };

    const goLogin = () => {
        history.push("/login");
    };

    return (
        <div
            className="notFoundPage"
            style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: "cover",
            }}
        >
            <div className="returnButtonContainer">
                <div className="returnButtonDiv">
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

export default NotFound;
