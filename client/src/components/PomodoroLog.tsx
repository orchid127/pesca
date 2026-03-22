import { useEffect, useState } from "react";
import React from "react";

type Session = {
    session_id: number,
    session_date: string,
    session_length: string
}

function SessionList() {

    const [sessions, setSessions] = useState<Session[]>([]);

    const getSessions = async () => {
        try {
            const response = await fetch("http://localhost:5000/sessions");
            const jsonData: Session[] = await response.json();

            // converting date into a local date string
            for (let i = 0; i < jsonData.length; i++) {
                jsonData[i].session_date = new Date(jsonData[i].session_date).toLocaleDateString("en-FR");
            }
            setSessions(jsonData);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    // fetch data
    useEffect(() => {
        getSessions();
    }, []);

    console.log(sessions);
    return (
        <div className="flex flex-col">
            <table className="w-full font-arialnarrow text-[#3F7BD4] ">
                <thead>
                    <tr className="h-[4rem] text-[1.5rem]">
                        <th className=" w-[50%]">Session length</th>
                        <th className="">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map(session => (
                        <tr className="odd:bg-[#C8DEFE] text-center text-[1.5rem]">
                            <td className="">{session.session_length}</td>
                            <td className="">{session.session_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}
export default SessionList;