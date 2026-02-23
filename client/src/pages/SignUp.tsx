import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col p-7 border border-[#EA5DA9] bg-[#F8C2DF]">
                <div className="">
                    <p className="text-[2rem] font-bold">new here ?</p>
                    <p className="text-[1.5rem] mt-[-1rem]">please enter your details.</p>
                </div>
                <div className="flex flex-col mt-2 gap-2">
                    <form className="flex flex-col">
                        <label htmlFor="email">email</label>
                        <input type="mail" id="email" />
                        <label htmlFor="password">password</label>
                        <input type="password" id="password" />
                    </form>

                    <div className="flex items-center">
                        <div>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">remember me</label>
                        </div>
                        <div className="flex justify-end gap-5">
                            <Link to="/sign-in" className="flex justify-end text-[#EA5DA9] hover:text-[#3F7BD4]">already have an account ?<span className="font-bold ml-2">sign up</span></Link>
                        </div>
                    </div>
                </div>
                <div className="">
                    <button type="submit" className="p-3 w-full text-white hover:text-[#3F7BD4] bg-[#EA5DA9] hover:bg-[#C8DEFE]">sign in</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;