import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Radio, Space } from "antd";
import React, { useState } from "react";
import "../../../assets/css/layouts/profile/UserProfile.css";
import MenuImage from "../../../assets/images/menu.jpg";
import defaultAvatar from "../../../assets/images/store-logo.png";
import Hero from "../../../components/layouts/Hero";

const { Content } = Layout;

function UserProfile() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        console.log("clicked");
        if (isSidebarVisible) setIsSidebarVisible(false);
        else setIsSidebarVisible(true);
    };

    const toggleEdit = () => {
        console.log("clicked");
    };

    const handleSave = () => {
        console.log("clicked");
    };

    const handleCancel = () => {
        console.log("clicked");
    };
    const activeClassname = isSidebarVisible ? "active" : null;

    return (
        <Content>
            <Hero title="Profile" sologan="" image={MenuImage} />
            <div className="wrapper profile">
                <div className={`profile__sidebar ${activeClassname}`}>
                    <FontAwesomeIcon icon={faTimes} id="exit" onClick={toggleSidebar} />
                    <img src={defaultAvatar} alt="defaultAvatar" className="avatar"></img>
                    <h1 className="username">Username</h1>
                    <ul className="nav__sidebar">
                        <li>
                            <a href="/profile">Profile</a>
                        </li>
                        <li>
                            <a href="/profile">Order History</a>
                        </li>
                        <li>
                            <a href="/profile">Voucher</a>
                        </li>
                    </ul>
                </div>

                {isSidebarVisible ? (
                    <div
                        className="sidebar-overlay"
                        onClick={() => {
                            isSidebarVisible && setIsSidebarVisible(false);
                        }}
                    ></div>
                ) : null}

                <div className="profile__manipulation">
                    <div className={`profile__bar ${activeClassname}`} onClick={toggleSidebar}>
                        <span></span>
                    </div>

                    <div className="myProfile">
                        <h1>MY PROFILE</h1>
                        <button className="" onClick={toggleEdit}>
                            Edit
                        </button>
                    </div>

                    <div className="profileForm">
                        <div className="profileForm_items">
                            <label>Full name</label>
                            <input type="text" />
                        </div>
                        <div className="profileForm_items">
                            <label>Phone</label>
                            <input type="text" />
                        </div>
                        <div className="profileForm_items">
                            <label>Address</label>
                            <div id="address_grid">
                                <input type="text" id="address" />
                                <input type="text" id="ward" />
                                <input type="text" id="district" />
                            </div>
                        </div>
                        <div className="profileForm_items">
                            <label>City</label>
                            <input type="text" />
                        </div>
                        <div className="profileForm_items">
                                <label>Gender</label>
                                <Radio.Group>
                                    <Space direction="horizontal">
                                        <Radio value="male">Male</Radio>
                                        <Radio value="female">Female</Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                        <div className="profileForm_items btn-group">
                            <button onClick={handleSave}> Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}
export default UserProfile;
