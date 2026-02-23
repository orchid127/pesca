import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
    onOpenSettings: () => void;
}

function Navbar(props: NavbarProps) {
    return (
        <>
            <div className="flex justify-end text-[2rem] text-[#EA5DA9] p-[0.3rem]">
                <Link to="/" className="p-[0.3rem] hover:text-[#3F7BD4]">home</Link>
                <button onClick={props.onOpenSettings} className="p-[0.3rem] hover:text-[#3F7BD4]">settings</button>
                <Link to="/sign-in" className="p-[0.3rem] hover:text-[#3F7BD4]">sign in</Link>
            </div>
        </>
    )
}

export default Navbar;