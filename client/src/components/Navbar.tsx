import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
    onOpenSettings: () => void;
}

function Navbar(props: NavbarProps) {
    return (
        <div className="p-5">
            <div className="flex justify-end text-[2.25rem] font-kiwisoda font-thin p-[0.5rem] border border-[#F7C0DD] border-[2px] rounded-[10px] bg-gradient-to-b from-[#FCE8F3] via-[#F8C2DF] to-[#FCE8F3]">
                <Link to="/" className="px-[0.5rem] text-[#3F7BD4] hover:text-[#EA5DA9]">home</Link>
                <button onClick={props.onOpenSettings} className="px-[0.5rem] text-[#3F7BD4] hover:text-[#EA5DA9]">settings</button>
                <Link to="/sign-in" className="px-[0.5rem] text-[#EA5DA9]">sign in</Link>
            </div>
        </div>
    )
}

export default Navbar;