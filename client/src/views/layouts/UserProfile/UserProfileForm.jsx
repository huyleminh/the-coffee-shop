import { Radio, Space } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChangeProfileWorkflow } from "../../../workflow/ManageProfileWorkflow";

UserProfileForm.propTypes = {
    profile: PropTypes.shape({
        address: PropTypes.string,
        city: PropTypes.string,
        createdAt: PropTypes.string,
        district: PropTypes.string,
        fullname: PropTypes.string,
        gender: PropTypes.string,
        infoUpdated: PropTypes.string,
        passwordUpdated: PropTypes.string,
        phoneNumber: PropTypes.string,
        role: PropTypes.number,
        username: PropTypes.string,
        ward: PropTypes.string,
    }),
};

function UserProfileForm(props) {
    const { profile } = props;
    const [isDisabled, setIsDisabled] = useState(true);
    const [userProfile, setUserProfile] = useState(profile);
    const history = useHistory();

    const toggleEdit = () => {
        setIsDisabled(false);
    };

    const handleCancel = () => {
        setUserProfile({
            address: "",
            city: "",
            createdAt: "",
            district: "",
            fullname: "",
            gender: "",
            infoUpdated: "",
            passwordUpdated: "",
            phoneNumber: "",
            role: "",
            username: "",
            ward: "",
        });
        setIsDisabled(true);
    };

    const handleInputChange = (e) => {
        const target = e.target;
        setUserProfile({
            ...userProfile,
            [target.name]: target.value,
        });
    };

    const handleSave = async () => {
        const { fullname, phoneNumber, address, ward, district, city, gender } = userProfile;
        const flow = new ChangeProfileWorkflow({
            fullname,
            phoneNumber,
            address,
            ward,
            district,
            city,
            gender,
        });
        const res = await flow.startFlow();

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
                <h1>MY PROFILE</h1>
                <button className="" onClick={toggleEdit}>
                    Edit
                </button>
            </div>
            <div className="profileForm">
                <div className="profileForm_items">
                    <label>Full name</label>
                    <input
                        type="text"
                        name="fullname"
                        value={userProfile.fullname}
                        placeholder="Full name"
                        onChange={handleInputChange}
                        disabled={isDisabled}
                    />
                </div>
                <div className="profileForm_items">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userProfile.phoneNumber}
                        placeholder="Phone number"
                        onChange={handleInputChange}
                        disabled={isDisabled}
                    />
                </div>
                <div className="profileForm_items">
                    <label id="address_label">Address</label>
                    <div id="address_grid">
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={userProfile.address}
                            placeholder="Your address"
                            onChange={handleInputChange}
                            disabled={isDisabled}
                        />
                        <input
                            type="text"
                            name="ward"
                            value={userProfile.ward}
                            placeholder="Your ward"
                            onChange={handleInputChange}
                            disabled={isDisabled}
                        />
                        <input
                            type="text"
                            name="district"
                            value={userProfile.district}
                            placeholder="Your district"
                            onChange={handleInputChange}
                            disabled={isDisabled}
                        />
                    </div>
                </div>
                <div className="profileForm_items">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={userProfile.city}
                        placeholder="Your city"
                        onChange={handleInputChange}
                        disabled={isDisabled}
                    />
                </div>
                <div className="profileForm_items">
                    <label>Gender</label>
                    <Radio.Group
                        name="gender"
                        value={userProfile.gender}
                        onChange={handleInputChange}
                        disabled={isDisabled}
                    >
                        <Space direction="horizontal">
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                        </Space>
                    </Radio.Group>
                </div>
                <div className="profileForm_items btn-group">
                    <button onClick={handleSave} disabled={isDisabled}>
                        Save
                    </button>
                    <button onClick={handleCancel} disabled={isDisabled}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default UserProfileForm;
