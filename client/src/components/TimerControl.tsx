import React from "react";

interface TimerControlProps {
    time: number;
    timeChange: (newTime: number) => void;
}

function TimerControl({ time, timeChange }: TimerControlProps) {

    const decrementTime = () => {
        if (time > 0) {
            timeChange(time - 1);
        }
    }

    const incrementTime = () => {
        if (time < 60) {
            timeChange(time + 1);
        }
    }

    return (
        <div className="flex justify-center items-center p-[0.25rem] w-[8rem] text-[1.5rem] text-[#EA5DA9] border border-[#EA5DA9] rounded-full">
            <button onClick={decrementTime} className="grow rounded-full hover:bg-[#F8C2DF]">-</button>
            <p className="">{time}</p>
            <button onClick={incrementTime} className="grow rounded-full hover:bg-[#F8C2DF]">+</button>
        </div>
    )
}

export default TimerControl;