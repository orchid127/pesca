import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../utils/SignUpValidation";

interface SignupErrors {
    username?: string;
    email?: string;
    password?: string
}

function SignUp() {
    const navigate = useNavigate();

    const [values, setValues] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState<SignupErrors>({});
    const [inputType, setInputType] = useState("password")

    const togglePasswordVisibility = () => {
        if (inputType === "password") {
            setInputType("text");
        } else if (inputType === "text") {
            setInputType("password");
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = Validation(values);
        setErrors(validationErrors);

        // checking if there's no errors
        if (validationErrors.username === "" && validationErrors.email === "" && validationErrors.password === "") {
            try {
                const response = await fetch("http://localhost:5000/users", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });

                const data = await response.json();
                console.log(data);
                navigate("/sign-in");


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
                    <p className="text-[4rem] lg:text-[6rem] text-[#EA5DA9] font-bold font-kiwisoda">new here ?</p>
                    <p className="text-[1.5rem] lg:text-[2rem] text-[#EA5DA9] mt-[-2rem] lg:mt-[-3rem] font-arialnarrow">please enter your details.</p>
                </div>
                <div className="flex flex-col mt-2 gap-2 min-w-[20rem]">
                    <form action="" onSubmit={handleSubmit} className="flex flex-col w-full">
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-[1.5rem] lg:text-[2rem] font-bold font-arialnarrow text-[#3F7BD4]">username</label>
                            <div className="flex flex-row text-[1.3rem] lg:text-[1.5rem] font-arialnarrow text-[#3F7BD4] border border-[#C8DEFE] rounded-[0.5rem] p-1">
                                <input type="text" name="username" placeholder="enter your username here" onChange={handleInput} className="w-full" />
                            </div>
                            {errors.username && <span className="font-arialnarrow text-[#3F7BD4]">{errors.username}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-[1.5rem] font-arialnarrow text-[#3F7BD4]">email</label>
                            <div className="flex flex-row text-[1.3rem] lg:text-[1.5rem] font-arialnarrow text-[#3F7BD4] border border-[#C8DEFE] rounded-[0.5rem] p-1">
                                <input type="mail" name="email" placeholder="enter your email" onChange={handleInput} className="w-full" />
                            </div>
                            {errors.email && <span className="font-arialnarrow text-[#3F7BD4]">{errors.email}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-[1.5rem] font-arialnarrow text-[#3F7BD4]">password</label>
                            <div className="flex flex-row text-[1.3rem] lg:text-[1.5rem] font-arialnarrow text-[#3F7BD4] border border-[#C8DEFE] rounded-[0.5rem] gap-2 p-1" >
                                <input type={inputType} name="password" id="password" placeholder="enter your password" onChange={handleInput} className="w-[80%]" />
                                <button type="button" onClick={togglePasswordVisibility} className="hover:bg-[#C8DEFE] text-[1.2rem] w-[20%]">{inputType === "password" ? "show" : "hide"}</button>
                            </div>
                            {errors.password && <span className="font-arialnarrow text-[#3F7BD4]">{errors.password}</span>}
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="p-1.5 w-full font-kiwisoda text-[2rem] text-[#3F7BD4] hover:text-[#FFFFFF] hover:bg-[#C8DEFE] border border-[#C8DEFE] rounded-[0.5rem]">sign up.</button>
                        </div>
                    </form>

                    <div className="flex flex-row justify-center text-[1.2rem] lg:text-[1.5rem]">
                        <Link to="/sign-in" className="text-[#3F7BD4] font-arialnarrow">already have an account? <span className="underline font-arialnarrow hover:text-[#EA5DA9]">sign in</span></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;