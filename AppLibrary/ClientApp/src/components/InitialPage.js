import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import "../assets/styles.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function InitialPage({ handleNotification }) {

    const history = useNavigate();
    const authenticated = localStorage.getItem("logged");

    useEffect(() => {
        if (authenticated === "true") {
            history("/home", { replace: true });
            // Redirect to home page
        } else {
            console.log("Vazhdo m");
        }
    }, [authenticated, history])

    return (
        <>
            <div className="initialpage">
                <LoginForm handleNotification={handleNotification} />
                <SignUpForm handleNotification={handleNotification} />
            </div>
        </>
    );
}

export default InitialPage;