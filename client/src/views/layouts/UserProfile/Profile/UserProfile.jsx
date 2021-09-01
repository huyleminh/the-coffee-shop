import React from "react";
import "../../../../assets/css/layouts/profile/UserProfile.css";
import UserProfileForm from "./UserProfileForm";
import UserSecurityForm from "./UserSecurityForm";

function UserProfile() {
    document.title = "Profile -  The Coffee Shop";
    return (
        <>
            <UserProfileForm />
            <UserSecurityForm />
        </>
    );
}
export default UserProfile;
