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
        <div onClick={closePopup} className="flex fixed top-0 left-0 w-[100%] h-[100%] justify-center items-center backdrop-blur-sm">
            <div onClick={(e) => e.stopPropagation()} className="p-[2.5rem] bg-[#F8C2DF]/25 border border-[#3F7BD4] backdrop-blur-md rounded-[1.5rem] justify-center">
                <div className="flex flex-row gap-5 justify-center">
                    <div className="items-center gap-[5rem]">
                        <p className="text-[#3F7BD4] text-[2rem] font-arialnarrow pb-2">session</p>
                        <p className="text-[#3F7BD4] text-[2rem] font-arialnarrow pb-2">break</p>
                        <p className="text-[#3F7BD4] text-[2rem] font-arialnarrow">long break</p>
                    </div>

                    <div className="justify-self-end">
                        <div className="pb-2">
                            <SettingsControl time={draftWork} timeChange={setWork} />
                        </div>
                        <div className="pb-2">
                            <SettingsControl time={draftPause} timeChange={setPause} />
                        </div>
                        <div className="">
                            <SettingsControl time={draftLongPause} timeChange={setLongPause} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center mt-[2rem] gap-2">
                    <button type="button" onClick={saveSettings} className="text-[2rem] font-kiwisoda text-[#3F7BD4] hover:text-[#FFFFFF] bg-[#FFFFFF] hover:bg-[#C8DEFE] border border-[#C8DEFE] rounded-[0.5rem] px-[2rem] w-15">ok !</button>
                    <button type="button" onClick={closePopup} className="text-[2rem] font-kiwisoda text-[#3F7BD4] hover:text-[#FFFFFF] bg-[#FFFFFF]  hover:bg-[#C8DEFE] border border-[#C8DEFE] rounded-[0.5rem] px-[2rem] w-15">cancel...</button>
                </div>
            </div >
        </div >
    )
}

export default PopupForm;