import React, { useState } from "react";
import Pomodoro from "../components/Pomodoro";


function Home() {
    const [work, setWork] = useState(25);
    const [pause, setPause] = useState(5);
    const [longPause, setLongPause] = useState(15);

    return (
        <div className="px-5 pb-5 w-[100%] h-full">
            <Pomodoro work={work} pause={pause} longPause={longPause} />
        </div>
    )
}

export default Home;

