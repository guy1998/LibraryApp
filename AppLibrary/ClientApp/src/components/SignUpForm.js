import "../assets/Login.css";
import { useState } from "react";
import Notification from "./Notification.js";
import { stripHtml } from "string-strip-html";

const handleTransition = () => {
    document.documentElement.style.setProperty("--signDisplay", "none");
    document.documentElement.style.setProperty("--logDisplay", "block");
}

const validatePassword = (password, handleNotification) => {
    console.log(password);
    if (!password) {
        handleNotification(<Notification response={false} message="The password appears to be empty" />);
        return false;
    }

    if (password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"))
        return true;

    handleNotification(<Notification response={false} message="The password should be at least 8 characters and contain at least uppercase letter, at least one lowercase letter and at least one number!" />);
    return false;
}

const validateUserName = (username, handleNotification)=>{
    if (!(username && username.length)){
        handleNotification(<Notification response={false} message="The username is too short" />);
        return false;
    }

    return true;
}

const validateInputs = (name, surname, username, password, handleNotification) => {

    const htmlFreeName = stripHtml(name).result;
    const htmlFreeSurname = stripHtml(surname).result;
    const htmlFreeUsername = stripHtml(username).result;
    const htmlFreePassword = stripHtml(password).result;

    if (htmlFreeName && htmlFreeSurname && validateUserName(htmlFreeUsername, handleNotification) && validatePassword(htmlFreePassword, handleNotification))
        return {
            name: htmlFreeName + " " + htmlFreeSurname,
            username: htmlFreeUsername,
            password: htmlFreePassword
        };

    return {};

}

const createHeaderOptions = (body)=>{
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    };
}

function SignUpForm({ handleNotification }) {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [element, setElement] = useState(<div style={{ display: "none;" }} ></div>)

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <>
            {element}
            <form className="form" id="sign" onSubmit={(event) => {
                event.preventDefault();
                const body = validateInputs(name, surname, username, password, handleNotification);
                if (Object.keys(body).length !== 0) {
                    fetch("/login/signup", createHeaderOptions(body))
                        .then(response => {
                            if (response.ok) {
                                handleNotification(<Notification response={true} message="Welcome to My Library App" />)
                                return response.json();
                            } else if (response.status === 401) {
                                handleNotification(<Notification response={false} message="The user already exists!" />)
                                document.getElementById("floatingPassword").style.borderColor = "red";
                                return "sth";
                            } else {
                                console.log(response.status);
                                handleNotification(<Notification response={false} message="Something went wrong! Please try again later!" />);
                                return "sth";
                            }
                        })
                        .then(data => {
                            if (data !== "sth") {
                                localStorage.setItem("logged", true);
                                localStorage.setItem("user", JSON.stringify(data));
                                localStorage.setItem("profilePath", "./user.png");
                                setElement(
                                    <div class="loading-container">
                                        <div class="loading-spinner"></div>
                                        <p class="loading-text">Loading...</p>
                                    </div>
                                )
                            }
                        })
                } else {
                    console.log("Here");
                }
            } }>
                <h2>Sign-Up</h2>
                <div className="sufields">
                    <div className="form-floating mb-3 inputDiv">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name"
                            style={{ backgroundColor: "transparent" }}
                            onChange={handleNameChange}
                        />
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating mb-3 inputDiv">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            style={{ backgroundColor: "transparent" }}
                            onChange={handleSurnameChange}
                        />
                        <label htmlFor="floatingInput">Surname</label>
                    </div>
                    <div className="form-floating mb-3 inputDiv">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            style={{ backgroundColor: "transparent" }}
                            onChange={handleUsernameChange}
                        />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating inputDiv">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            style={{ backgroundColor: "transparent" }}
                            onChange={handlePasswordChange}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </div>
                <button type="submit" className="button2">
                    Sign-up
                </button>
                <h6>Already registered? <u onClick={handleTransition}>Log-in now!</u></h6>
            </form>
        </>
    );

}


export default SignUpForm;