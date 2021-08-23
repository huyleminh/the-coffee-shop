import { LoadingOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NotificationBox from "../../../../components/NotificationBox";
import { ChangeSecurityWorkflow } from "../../../../workflow/ManageProfileWorkflow";

function UserSecurityForm(props) {
    const history = useHistory();
    const [isDisabled, setIsDisabled] = useState(true);
    const [security, setSecurity] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [isSaving, setIsSaving] = useState(false);

    const toggleEdit = () => setIsDisabled(false);

    const handleCancel = () => {
        if (isDisabled) return;
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
        setIsSaving(true);
        const flow = new ChangeSecurityWorkflow({ ...security });

        try {
            const res = await flow.startFlow();

            if (res.status === 204) {
                NotificationBox.triggerSuccess("CHANGE PASSWORD SUCCESS", res.statusText);
                setIsSaving(false);
                handleCancel();
            } else if (res.status === 400) {
                alert(res.statusText);
                setIsSaving(false);
            } else if (res.status === 401 || res.status === 404) {
                alert("You are not logged in, please login again.");
                history.push("/login");
            } else if (res.status === 403) {
                alert("You are not allowed to access this page.");
                localStorage.removeItem("user");
                localStorage.removeItem("profile");
                history.push("/403");
            } else if (res.status === 409) {
                NotificationBox.triggerError("CHANGE PASSWORD ERROR", res.statusText);
                setIsDisabled(true);
                setIsSaving(false);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong.");
            setIsSaving(false);
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
                    <button onClick={handleSave} disabled={isDisabled}>
                        {isSaving ? <LoadingOutlined spin /> : "Save"}
                    </button>
                    <button onClick={handleCancel} disabled={isDisabled}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default UserSecurityForm;
