import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../utils/SignInValidation";

interface SigninErrors {
    email?: string;
    password?: string
}

function SignIn() {
    const navigate = useNavigate();

    const [values, setValues] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<SigninErrors>({});

    // saves values of the other inputs when changing an input
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    // handles errors when submitting form
    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        console.log("test");
        event.preventDefault();

        const validationErrors = Validation(values);
        setErrors(validationErrors);
        console.log(validationErrors);

        // checking if there's no errors
        if (validationErrors.email === "" && validationErrors.password === "") {
            try {
                const response = await fetch("http://localhost:5000/users/signin", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });

                response.text();
                navigate("/profile");

            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        }
    }

    return (
        <div className="flex flex-col h-[100%] w-[100%] p-5">
            <div className="flex flex-col items-center justify-center h-[100%] w-[100%] p-7 border border-[#F7C0DD] border-[2px] rounded-[10px]">
                <div className="text-center">
                    <p className="text-[4rem] text-[#EA5DA9] font-bold font-kiwisoda">welcome back !</p>
                    <p className="text-[1.5rem] text-[#EA5DA9] mt-[-2rem] font-arialnarrow">please enter your details.</p>
                </div>
                <div className="flex flex-col mt-2 gap-2">
                    <form action="" onSubmit={handleSubmit} className="flex flex-col">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-[1.5rem] font-arialnarrow text-[#3F7BD4]">email</label>
                            <input type="mail" name="email" placeholder="enter your email" onChange={handleInput} />
                            {errors.email && <span className="text-[#3F7BD4]">{errors.email}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-[1.5rem] font-arialnarrow text-[#3F7BD4]">password</label>
                            <input type="password" name="password" placeholder="enter your password" onChange={handleInput} />
                            {errors.password && <span className="text-[#3F7BD4]">{errors.password}</span>}
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="p-1.5 w-full font-kiwisoda text-[2rem] text-[#3F7BD4] hover:text-[#FFFFFF] hover:bg-[#C8DEFE] border border-[#C8DEFE] rounded-[0.5rem]">sign in !</button>
                        </div>
                    </form>

                    <div className="flex items-center gap-5">
                        <div className="">
                            <input type="checkbox" id="remember" className="mr-1 border border-[#3F7BD4]" />
                            <label htmlFor="remember" className="font-arialnarrow text-[#3F7BD4]">remember me</label>
                        </div>
                        <div className="flex justify-end">
                            <Link to="/sign-up" className="flex justify-end text-[#3F7BD4] font-arialnarrow">don't have an account? <span className="font-bold ml-2 font-arialnarrow hover:text-[#EA5DA9]">sign up</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;