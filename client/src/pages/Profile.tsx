import React from "react";
import SessionList from "../components/SessionList";

function Profile() {
    return (
        <div className="p-5">
            <div className="">
                <p className="text-[4rem] text-[#EA5DA9] font-bold">Welcome to your profile (˶ˆᗜˆ˵)</p>
            </div>
            <div>
                <h1 className="text-[2rem] text-[#EA5DA9] underline">Your sessions</h1>
                <SessionList />
            </div>
        </div>
    )
}

export default Profile;