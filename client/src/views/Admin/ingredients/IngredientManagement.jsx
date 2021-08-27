import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Result } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

function IngredientManagement() {
    const history = useHistory();
    return (
        <div className="custom-site-main-content">
            <Result
                icon={
                    <FontAwesomeIcon
                        spin
                        icon={faCog}
                        style={{ fontSize: "35px", color: "#503a23" }}
                    />
                }
                title="Coming soon!"
                subTitle="This feature is being developed. Please comeback latter."
                extra={
                    <button style={{ fontWeight: "700" }} onClick={() => history.push("/admin")}>
                        Back to Home
                    </button>
                }
                style={{ height: "100%" }}
            />
        </div>
    );
}

export default IngredientManagement;
