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

                const data = await response.text();
                navigate("/profile");

            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        }
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col p-7 border border-[#EA5DA9] bg-[#F8C2DF]">
                <div className="">
                    <p className="text-[2rem] font-bold">welcome back !</p>
                    <p className="text-[1.5rem] mt-[-1rem]">please enter your details.</p>
                </div>
                <div className="flex flex-col mt-2 gap-2">
                    <form action="" onSubmit={handleSubmit} className="flex flex-col">
                        <div className="flex flex-col">
                            <label htmlFor="email">email</label>
                            <input type="mail" name="email" placeholder="enter your email" onChange={handleInput} />
                            {errors.email && <span className="text-[#3F7BD4]">{errors.email}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password">password</label>
                            <input type="password" name="password" placeholder="enter your password" onChange={handleInput} />
                            {errors.password && <span className="text-[#3F7BD4]">{errors.password}</span>}
                        </div>
                        <div className="">
                            <button type="submit" className="p-3 w-full text-white hover:text-[#3F7BD4] bg-[#EA5DA9] hover:bg-[#C8DEFE]">sign in</button>
                        </div>
                    </form>

                    <div className="flex items-center gap-5">
                        <div>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">remember me</label>
                        </div>
                        <div className="flex justify-end">
                            <Link to="/sign-up" className="flex justify-end text-[#EA5DA9] hover:text-[#3F7BD4]">don't have an account? <span className="font-bold ml-2">sign up</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;