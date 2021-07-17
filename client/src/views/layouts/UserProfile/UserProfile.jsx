import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../assets/css/layouts/profile/UserProfile.css";
import MenuImage from "../../../assets/images/menu.jpg";
import defaultAvatar from "../../../assets/images/store-logo.png";
import Hero from "../../../components/layouts/Hero";
import Loading from "../../../components/Loading";
import UserAPI from "../../../services/User/UserAPI";
import UserProfileForm from "./UserProfileForm";
import UserSecurityForm from "./UserSecurityForm";

const { Content } = Layout;

function UserProfile() {
    const history = useHistory();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState({
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

    const toggleSidebar = () => {
        if (isSidebarVisible) setIsSidebarVisible(false);
        else setIsSidebarVisible(true);
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

                    setProfile(resProfile);
                    setIsLoading(false);
                } else if (response.status === 404) {
                    alert(response.message);
                    history.push("/404");
                } else if (response.status === 403) {
                    alert("You are not allowed.");
                    history.push("/403");
                }
            } catch (error) {
                console.log(error);
                alert("Something went wrong.");
                history.push("/403");
            }
        };

        fetchUserProfile();
        // eslint-disable-next-line
    }, []);

    const activeClassname = isSidebarVisible ? "active" : null;

    return (
        <Content>
            <Hero title="Profile" sologan="" image={MenuImage} />
            <div className="wrapper profile">
                <div className={`profile__sidebar ${activeClassname}`}>
                    <FontAwesomeIcon icon={faTimes} id="exit" onClick={toggleSidebar} />
                    <img src={defaultAvatar} alt="defaultAvatar" className="avatar"></img>
                    <h1 className="username">{profile.username}</h1>
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
                        <span>Profile sidebar</span>
                    </div>

                    {isLoading ? (
                        <Loading
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        />
                    ) : (
                        <>
                            <UserProfileForm profile={profile} />
                            <UserSecurityForm />
                        </>
                    )}
                </div>
            </div>
        </Content>
    );
}
export default UserProfile;
