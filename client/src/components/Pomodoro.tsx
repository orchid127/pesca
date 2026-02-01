import React, { useState, useEffect } from "react";

function Pomodoro() {

    const [timer, setTimer] = useState(30);
    const [isRunning, setIsRunning] = useState(false);

    const convertTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time - hours * 60) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        // stops if the timer isn't running
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);


        return () => clearInterval(intervalId);
    }, [isRunning, timer]);

    const startPauseTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimer(30);
    }

    const logSession = async () => {
        try {
            const currDate = new Date();
            const body = {
                session_date: currDate,
                session_length: "00:00:30"
            }
            const response = await fetch("http://localhost:5000/sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            const data = await response.json();
            console.log("Session logged:", data);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        if (timer === 0 && !isRunning) {
            logSession();
        }
    }, [timer, isRunning]);

    return (
        <div>
            <p>session ongoing</p>
            <h1>{convertTime(timer)}</h1>
            <button type="button" onClick={startPauseTimer}>start</button>
            <button type="button" onClick={resetTimer}>reset</button>
        </div>
    )
}

export default Pomodoro;