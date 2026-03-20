import React, { useState } from "react";
import Pomodoro from "../components/Pomodoro";
import Navbar from "../components/Navbar";
import PomodoroSettings from "../components/PomodoroSettings";


function Home() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [work, setWork] = useState(25);
    const [pause, setPause] = useState(5);
    const [longPause, setLongPause] = useState(15);

    // opening or closing the pop up form
    const openPopupForm = () => {
        setIsPopupOpen(true);
    }

    const closePopupForm = () => {
        setIsPopupOpen(false);
    }

    const updateTimers = (newWork: number, newPause: number, newLongPause: number) => {
        console.log("updateTimers called with:", newWork, newPause, newLongPause);

        // updating timers only if the value exists
        setWork(newWork);
        setPause(newPause);
        setLongPause(newLongPause);
    };


    return (
        <div className="p-5 flex flex-col h-full">
            <Navbar onOpenSettings={openPopupForm} />
            <Pomodoro work={work} pause={pause} longPause={longPause} />
            <PomodoroSettings isOpen={isPopupOpen} currWork={work} currPause={pause} currLongPause={longPause} onClose={closePopupForm} onSave={updateTimers} />
        </div>

    )
}

export default Home;

