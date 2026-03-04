import React, { useState, useRef } from "react";

interface PomodoroProps {
    work: number,
    pause: number,
    longPause: number
}

function Pomodoro({ work, pause, longPause }: PomodoroProps) {
    // testing
    console.log("Pomodoro received:", work, pause, longPause);

    const [timeLeft, setTimeLeft] = useState(work * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("work");
    const [numberSessions, setNumberSessions] = useState(0);
    const intervalRef = useRef<any>(null); // value of the timer

    const startTimer = () => {
        // returns the time minus one second, each second
        intervalRef.current = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft !== 0) {
                    return prevTimeLeft - 1;
                }
                // clears the current interval
                clearInterval(intervalRef.current);

                // change the timer
                if (mode === "work") {
                    // logs the session if in work mode
                    logSession();
                    setTimeLeft(pause * 60);

                    // checks if the user did 3 work sessions
                    if (numberSessions !== 3) {
                        setMode("pause");
                        setNumberSessions(numberSessions + 1);
                    } else {
                        setMode("long pause");
                        setNumberSessions(0);
                    }

                    console.log(numberSessions);
                }
                else {
                    setTimeLeft(work * 60);
                    setMode("work");
                }

                return 0;
            });
        }, 1000);
    }


    const pauseTimer = () => {
        // clear existing interval
        setIsRunning(false);
        clearInterval(intervalRef.current);

    };

    const startPauseTimer = () => {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        if (mode === "work") {
            setTimeLeft(work * 60);
        }
        else {
            setTimeLeft(pause * 60);
        }

    }

    const skipTimer = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);

        if (mode === "work") {
            setMode("pause");
            setTimeLeft(pause * 60);
        }
        else {
            setMode("work");
            setTimeLeft(work * 60);
        }
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

    return (
        <>
            <div className="absolute bottom-0 pb-5">
                <p>{mode === "work" ? "let's get to work !" : "break time"}</p>
                <div className="text-[20rem] text-[#3F7BD4] underline italic">
                    <span>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}</span>
                    <span>:</span>
                    <span>{String(timeLeft % 60).padStart(2, "0")}</span>
                </div>
                <div className="">
                    <button type="button" onClick={resetTimer} className="text-[2rem] text-[#EA5DA9] hover:text-[#F8C2DF] bg-[#F8C2DF] hover:bg-[#EA5DA9] px-[0.75rem] py-[0.25rem]
                rounded-tl-lg rounded-br-lg border border-[#EA5DA9] hover:border-[#F8C2DF]">reset</button>
                    <button type="button" onClick={startPauseTimer} className="text-[2rem] text-[#EA5DA9] hover:text-[#F8C2DF] bg-[#F8C2DF] hover:bg-[#EA5DA9] px-[0.75rem] py-[0.25rem]
                rounded-tl-lg rounded-br-lg border border-[#EA5DA9] hover:border-[#F8C2DF]">{isRunning ? 'stop' : 'start'}</button>
                    <button type="button" onClick={skipTimer} className="text-[2rem] text-[#EA5DA9] hover:text-[#F8C2DF] bg-[#F8C2DF] hover:bg-[#EA5DA9] px-[0.75rem] py-[0.25rem]
                rounded-tl-lg rounded-br-lg border border-[#EA5DA9] hover:border-[#F8C2DF]">skip</button>
                </div>
            </div>
        </>
    )
}

export default Pomodoro;