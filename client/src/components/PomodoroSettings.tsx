import React, { useState } from "react";
import SettingsControl from "./SettingsControl";

interface PopupFormProps {
    isOpen: boolean,
    currWork: number,
    currPause: number,
    currLongPause: number,
    onClose: () => void;
    onSave: (work: number, pause: number, longPause: number) => void;
}

function PopupForm({ isOpen, currWork, currPause, currLongPause, onClose, onSave }: PopupFormProps) {
    const [draftWork, setWork] = useState(currWork);
    const [draftPause, setPause] = useState(currPause);
    const [draftLongPause, setLongPause] = useState(currLongPause);

    const saveSettings = () => {
        onSave(draftWork, draftPause, draftLongPause);
        onClose();
    }

    const closePopup = () => {
        setWork(currWork);
        setPause(currPause);
        setLongPause(currLongPause);
        onClose();
    }

    // non displayed
    if (!isOpen) return null;

    // displayed
    return (
        <div onClick={closePopup} className="flex fixed top-0 left-0 w-[100%] h-[100%] justify-center items-center">
            <div onClick={(e) => e.stopPropagation()} className="p-[2.5rem] bg-[#FFFFFF] border border-[#3F7BD4] rounded-[1.5rem] justify-center">

                <div className="flex items-center gap-[5rem]">
                    <p className="text-[#3F7BD4] text-[2rem]">session</p>
                    <SettingsControl time={draftWork} timeChange={setWork} />
                </div>

                <div className="flex items-center gap-[5rem]">
                    <p className="text-[#3F7BD4] text-[2rem]">break</p>
                    <div className="justify-left">
                        <SettingsControl time={draftPause} timeChange={setPause} />
                    </div>
                </div>

                <div className="flex items-center gap-[5rem]">
                    <p className="text-[#3F7BD4] text-[2rem]">long break</p>
                    <div>
                        <SettingsControl time={draftLongPause} timeChange={setLongPause} />
                    </div>

                </div>
                <div className="flex justify-center items-center mt-[2rem]">
                    <button type="button" onClick={saveSettings} className="text-[2rem] text-[#3F7BD4] hover:text-[#FFFFFF] hover:bg-[#C8DEFE] border border-[#C8DEFE] px-[2rem]">ok !</button>
                    <button type="button" onClick={closePopup} className="text-[2rem] text-[#3F7BD4] hover:text-[#FFFFFF] hover:bg-[#C8DEFE] border border-[#C8DEFE] px-[2rem]">cancel...</button>
                </div>
            </div >
        </div >
    )
}

export default PopupForm;