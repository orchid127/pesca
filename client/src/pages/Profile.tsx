import React, { useState } from "react";
import SessionList from "../components/SessionList";
import Navbar from "../components/Navbar";
import pfp from '../calico-critter.jpg'

function Profile() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // opening or closing the pop up form
    const openPopupForm = () => {
        setIsPopupOpen(true);
    }

    return (
        <div className="p-5">
            <Navbar onOpenSettings={openPopupForm} />
            <div className="flex flex-col lg:flex-row gap-5">
                <div className="border-[#F7C0DD] border-[2px] rounded-[10px]">
                    <img src={pfp} alt="user pfp" className="w-30" />
                    <p>@username</p>
                </div>
                <div className="border-[#F7C0DD] border-[2px] rounded-[10px]">
                    <h1 className="text-[2rem] text-[#EA5DA9] underline">Your sessions</h1>
                </div>
            </div>
        </div>
    )
}

export default Profile;