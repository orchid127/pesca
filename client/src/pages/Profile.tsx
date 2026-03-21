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
        <div className="flex flex-col p-5 max-h-screen">
            <Navbar onOpenSettings={openPopupForm} />
            <div className="flex flex-1 flex-col lg:flex-row gap-5">
                <div className="flex flex-row lg:items-center lg:flex-col lg:w-[25rem] bg-[#F8C2DF]/20 border-[#EA5DA9] border-[2px] rounded-[10px] p-5 gap-5">
                    <div className="flex-1 w-full rounded-[10px]">
                        <img src={pfp} alt="user pfp" className="object-cover w-full h-full rounded-[10px]" />
                    </div>
                    <div className="flex-1 border-[#F7C0DD] border-[2px] rounded-[10px] p-5 w-full">
                        <p className="font-kiwisoda text-[#3F7BD4] text-[2rem] md:text-[3rem]">@username</p>
                        <p className="font-arialnarrow text-[#3F7BD4] text-[1.5rem]">statistics coming soon...</p>
                    </div>
                </div>
                <div className="flex-1 border-[#F7C0DD] border-[2px] rounded-[10px] p-5">
                    <h1 className="font-kiwisoda text-[#EA5DA9] text-[4rem] lg:text-[6rem]">your sessions</h1>
                    <p className="font-arialnarrow text-[#EA5DA9] text-[1.5rem]">logs coming soon...</p>
                    <SessionList />
                </div>
            </div>
        </div>
    )
}

export default Profile;