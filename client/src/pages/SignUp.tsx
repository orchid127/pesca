import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../components/SignUpValidation";

interface SignupErrors {
    username?: string;
    email?: string;
    password?: string
}

function SignUp() {
    const navigate = useNavigate();

    const [values, setValues] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState<SignupErrors>({});

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
        <div className="flex justify-center">
            <div className="flex flex-col p-7 border border-[#EA5DA9] bg-[#F8C2DF]">
                <div className="">
                    <p className="text-[2rem] font-bold">new here ?</p>
                    <p className="text-[1.5rem] mt-[-1rem]">please enter your details.</p>
                </div>
                <div className="flex flex-col mt-2 gap-2">
                    <form action="" onSubmit={handleSubmit} className="flex flex-col">
                        <div className="flex flex-col">
                            <label htmlFor="username">username</label>
                            <input type="text" name="username" placeholder="enter your username here" onChange={handleInput} />
                            {errors.username && <span className="text-[#3F7BD4]">{errors.username}</span>}
                        </div>
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
                            <button type="submit" className="p-3 w-full text-white hover:text-[#3F7BD4] bg-[#EA5DA9] hover:bg-[#C8DEFE]">sign up</button>
                        </div>
                    </form>

                    <div className="flex items-center">
                        <div className="flex justify-end gap-5">
                            <Link to="/sign-in" className="flex justify-end text-[#EA5DA9] hover:text-[#3F7BD4]">already have an account ?<span className="font-bold ml-2">sign up</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;