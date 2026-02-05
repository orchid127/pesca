import React from "react";

interface NavbarProps {
    onOpenSettings: () => void;
}

function Navbar(props: NavbarProps) {
    return (
        <>
            <div className="flex justify-end text-[2rem] text-[#EA5DA9] p-[0.3rem]">
                <button onClick={props.onOpenSettings} className="p-[0.3rem] hover:text-[#3F7BD4]">settings</button>
                <button className="p-[0.3rem] hover:text-[#3F7BD4]">sign in</button>
            </div>
        </>
    )
}

export default Navbar;