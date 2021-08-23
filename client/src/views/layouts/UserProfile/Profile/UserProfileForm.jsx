import { LoadingOutlined } from "@ant-design/icons";
import { Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../../../components/Loading";
import NotificationBox from "../../../../components/NotificationBox";
import UserAPI from "../../../../services/User/UserAPI";
import { ChangeProfileWorkflow } from "../../../../workflow/ManageProfileWorkflow";

function UserProfileForm() {
    const [isDisabled, setIsDisabled] = useState(true);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({
        address: "",
        city: "",
        createdAt: "",
        district: "",
        fullname: "",
        gender: "",
        infoUpdated: "",
        passwordUpdated: "",
        phoneNumber: "",
        role: 3,
        username: "username",
        ward: "",
    });
    const [isSaving, setIsSaving] = useState(false);

    const [oldUserProfile, setOldUserProfile] = useState({});

    const toggleEdit = () => setIsDisabled(false);

    const handleCancel = () => {
        if (isDisabled) return;
        setIsDisabled(true);
        setUserProfile(oldUserProfile);
    };

    const handleInputChange = (e) => {
        const target = e.target;
        setUserProfile({
            ...userProfile,
            [target.name]: target.value,
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
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
        try {
            const res = await flow.startFlow();

            if (res.status === 204) {
                NotificationBox.triggerSuccess("CHANGE PROFILE SUCCESS", res.statusText);
                setIsDisabled(true);
                setIsSaving(false);
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
                NotificationBox.triggerError("CHANGE PROFILE ERROR", res.statusText);
                setIsDisabled(true);
                setIsSaving(false);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong.");
            setIsSaving(false);
        }
    };

    useEffect(() => {
        document.querySelector(".profile__sidebar").scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
        const fetchUserProfile = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("user")).token;
                const response = await UserAPI.getUserProfile(token);
                if (response.status === 200) {
                    const resProfile = {
                        ...response.data.userInfo,
                        infoUpdated: response.data.userInfo.updatedAt,
                        ...response.data.userLogin,
                        passwordUpdated: response.data.userLogin.updatedAt,
                    };
                    delete resProfile["updatedAt"];

                    if (!resProfile.address) {
                        resProfile.address = "";
                        resProfile.ward = "";
                        resProfile.district = "";
                        resProfile.city = "";
                    } else {
                        const splited = resProfile.address.split("&&");
                        resProfile.address = splited[0] === "undefined" ? "" : splited[0];
                        resProfile.ward = splited[1] === "undefined" ? "" : splited[1];
                        resProfile.district = splited[2] === "undefined" ? "" : splited[2];
                        resProfile.city = splited[3] === "undefined" ? "" : splited[3];
                    }

                    resProfile.gender = resProfile.gender === 0 ? "male" : "female";
                    localStorage.setItem("profile", JSON.stringify(resProfile));

                    setUserProfile(resProfile);
                    setOldUserProfile(resProfile);
                    setIsLoading(false);
                } else if (response.status === 403 || response.status === 404) {
                    alert("You are not allowed to access this page.");
                    history.push("/403");
                }
            } catch (error) {
                console.log(error);
                alert("Something went wrong.");
            }
        };

        fetchUserProfile();
    }, [history]);

    if (isLoading)
        return (
            <Loading
                style={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            />
        );
    else
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

export default UserProfileForm;
