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
        <>
            <div>
                <table className="w-[100%] border-collapse border border-[#3F7BD4]">
                    <thead>
                        <tr>
                            <th className="border border-[#3F7BD4]">ID</th>
                            <th className="border border-[#3F7BD4]">Session length</th>
                            <th className="border border-[#3F7BD4]">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*<tr>
                        <td>1</td>
                        <td>25:00</td>
                        <td>30/01/2026 18:56</td>
                    </tr>*/}
                        {sessions.map(session => (
                            <tr className="odd:bg-[#C8DEFE]">
                                <td className="border border-[#3F7BD4]">{session.session_id}</td>
                                <td className="border border-[#3F7BD4]">{session.session_length}</td>
                                <td className="border border-[#3F7BD4]">{session.session_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    )
}
export default SessionList;