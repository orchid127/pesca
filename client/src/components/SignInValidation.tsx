interface SigninValues {
    email: string;
    password: string;
}

function Validation(values: SigninValues) {
    // error message
    let error: { email?: string, password?: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    // handling errors with email input
    if (values.email === "") { // checks if the email input is empty
        error.email = "email should not be empty.";
    } else if (!emailRegex.test(values.email)) { // checks if the input is an actual email adress
        error.email = "please enter a correct email.";
    } else {
        error.email = "";
    }

    // handling errors with password input
    if (values.password === "") {
        error.password = "password should not be empty.";
    } else if (!passwordRegex.test(values.password)) {
        error.password = "The password can only contain digits, lower case and upper case characters.";
    } else {
        error.password = "";
    }

    return error;
}

export default Validation;