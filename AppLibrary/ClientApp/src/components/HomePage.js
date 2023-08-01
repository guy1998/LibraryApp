import ProfileInfo from "./ProfileInfo";
import AuthorPanel from "./AuthorPanel";
import BookPanel from "./BookPanel";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Notification from "./Notification.js";
function HomePage({ handleNotification }) {

    const history = useNavigate();
    const authenticated = localStorage.getItem("logged");

    useEffect(() => {
        if (authenticated === "false") {
            handleNotification(<Notification response={false} message="You need to login first!" />)
            history("/", { replace: true });
            // Redirect to login page
        } else {
            console.log("Vazhdo m");
        }
    }, [authenticated, history, handleNotification])

    const admin1 = JSON.parse(localStorage.getItem("user"));

    return (
        <div style={{ backgroundColor: "white", height: "100vh", width: "100vw", display: "flex" }}>
            <ProfileInfo admin={admin1} handleNotification={handleNotification}></ProfileInfo>
            <div>
                <AuthorPanel></AuthorPanel>
                <BookPanel></BookPanel>
            </div>
        </div>
    );

}


export default HomePage;