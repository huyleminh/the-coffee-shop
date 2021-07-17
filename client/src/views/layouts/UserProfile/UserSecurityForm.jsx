import React, { useState } from "react";
import { ChangeSecurityWorkflow } from "../../../workflow/ManageProfileWorkflow";
import { useHistory } from "react-router-dom";

function UserSecurityForm(props) {
    const history = useHistory();
    const [isDisabled, setIsDisabled] = useState(true);
    const [security, setSecurity] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    });

    const toggleEdit = () => {
        setIsDisabled(false);
    };

    const handleCancel = () => {
        const prev = { ...security };
        Object.keys(prev).forEach((key) => (prev[key] = ""));
        setSecurity(prev);
        setIsDisabled(true);
    };

    const handleInputChange = (e) => {
        const target = e.target;
        setSecurity({
            ...security,
            [target.name]: target.value,
        });
    };

    const handleSave = async () => {
        setIsDisabled(true);
        const flow = new ChangeSecurityWorkflow({ ...security });

        const res = await flow.startFlow();
        console.log(res);

        switch (res.status) {
            case 204:
                alert(res.statusText);
                handleCancel();
                break;
            case 400:
                alert(res.statusText);
                break;
            case 401:
            case 404:
                alert(res.statusText);
                localStorage.clear();
                history.push("/404");
                break;
            case 403:
                alert("You are not allowed.");
                localStorage.clear();
                console.log(res.statusText);
                history.push("/403");
                break;
            case 409:
                alert(res.statusText);
                break;

            default:
                console.log(res);
        }
    };

    return (
        <>
            <div className="myProfile">
                <h1>SECURITY</h1>
                <button className="" onClick={toggleEdit}>
                    Edit
                </button>
            </div>
            <div className="profileForm">
                <div className="profileForm_items">
                    <label>Current Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Your current password"
                        value={security.password}
                        onChange={handleInputChange}
                        disabled={isDisabled}
                    />
                </div>
                <div className="profileForm_items">
                    <label>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="Enter new password"
                        value={security.newPassword}
                        onChange={handleInputChange}
                        disabled={isDisabled}
                    />
                </div>
                <div className="profileForm_items">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        value={security.confirmPassword}
                        onChange={handleInputChange}
                        disabled={isDisabled}
                    />
                </div>
                <div className="profileForm_items btn-group">
                    <button onClick={handleSave} disabled={isDisabled}>Save</button>
                    <button onClick={handleCancel} disabled={isDisabled}>Cancel</button>
                </div>
            </div>
        </>
    );
}

export default UserSecurityForm;
