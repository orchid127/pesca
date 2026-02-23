import React, { useState } from "react";
import Pomodoro from "../components/Pomodoro";


function Home() {
    const [work, setWork] = useState(25);
    const [pause, setPause] = useState(5);
    const [longPause, setLongPause] = useState(15);

    return (
        <>
            <Pomodoro work={work} pause={pause} longPause={longPause} />
        </>
    )
}

export default Home;

