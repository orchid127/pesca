import React, { useState } from "react";
import TimerControl from "./TimerControl";

interface PopupFormProps {
    isOpen: boolean,
    setOpen: (open: boolean) => void;
}

function PopupForm(props: PopupFormProps) {
    const [work, setWork] = useState(25);
    const [pause, setPause] = useState(5);
    const [longPause, setLongPause] = useState(15);

    const updateWork = (newWork: number) => {
        setWork(newWork);
    };

    const updatePause = (newPause: number) => {
        setPause(newPause);
    }

    const updateLongPause = (newLongPause: number) => {
        setLongPause(newLongPause);
    }

    const closePopup = () => {
        props.setOpen(false);
    }


    if (!props.isOpen) return null;

    return (
        <>
            <div className="flex fixed top-0 left-0 w-[100%] h-[100%] justify-center items-center">
                <div className="p-[2.5rem] bg-[#FFFFFF] border border-[#3F7BD4] rounded-[1.5rem] justify-center">

                    <div className="flex items-center gap-[5rem]">
                        <p className="text-[#3F7BD4] text-[2rem]">session</p>
                        <TimerControl time={work} timeChange={updateWork} />
                    </div>

                    <div className="flex items-center gap-[5rem]">
                        <p className="text-[#3F7BD4] text-[2rem]">break</p>
                        <div className="justify-left">
                            <TimerControl time={pause} timeChange={updatePause} />
                        </div>
                    </div>

                    <div className="flex items-center gap-[5rem]">
                        <p className="text-[#3F7BD4] text-[2rem]">long break</p>
                        <div>
                            <TimerControl time={longPause} timeChange={updateLongPause} />
                        </div>

                    </div>
                    <div className="flex justify-center items-center mt-[2rem]">
                        <button type="button" onClick={closePopup} className="text-[2rem] text-[#3F7BD4] hover:text-[#FFFFFF] hover:bg-[#C8DEFE] border border-[#C8DEFE] px-[2rem]">ok !</button>
                        <button type="button" onClick={closePopup} className="text-[2rem] text-[#3F7BD4] hover:text-[#FFFFFF] hover:bg-[#C8DEFE] border border-[#C8DEFE] px-[2rem]">cancel...</button>
                    </div>
                </div >
            </div >

        </>
    )
}

export default PopupForm;