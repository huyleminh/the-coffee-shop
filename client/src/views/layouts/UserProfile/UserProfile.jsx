import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout } from "antd";
import React, { useState } from "react";
import "../../../assets/css/layouts/profile/UserProfile.css";
import MenuImage from "../../../assets/images/menu.jpg";
import Hero from "../../../components/layouts/Hero";
import defaultAvatar from "../../../assets/images/store-logo.png"

const { Content } = Layout;

function UserProfile() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        console.log("clicked");
        if (isSidebarVisible) setIsSidebarVisible(false);
        else setIsSidebarVisible(true);
    };

    const activeClassname = isSidebarVisible ? "active" : null;

    return (
        <Content>
            <Hero title="Profile" sologan="" image={MenuImage} />
            <div className="wrapper profile">
                <div className={`profile__sidebar ${activeClassname}`}>
                    <FontAwesomeIcon icon={faTimes} id="exit" onClick={toggleSidebar} />
                    <img src={defaultAvatar} alt="default-avatar" className="avatar"></img>
                    <h1 className="username">Username</h1>
                    <ul className="nav__sidebar">
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="#">Order History</a></li>
                        <li><a href="#">Voucher</a></li>
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
                    <div
                        className={`profile__sidebar ${activeClassname}`}
                        onClick={toggleSidebar}
                    >
                        <span>Filter</span>
                    </div>
                    <div>test</div>
                </div>
            </div>
        </Content>
    )
}
export default UserProfile;
