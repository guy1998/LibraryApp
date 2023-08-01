import "../assets/notification.css";
import Confirm from "../images/confirm.png";
import Cancel from "../images/cancel.png";


function Notification({ response, message }) {

    return (
        <>
            <div className="notificationBox">
                <div className="notificationHeader">
                    <img src={response ? Confirm : Cancel}></img>
                    <h3 className={response ? "positiveResponse" : "negativeResponse" }>{response ? "Success" : "Rejected"}</h3>
                </div>
                <p className="notificationMessage">{message}</p>
            </div>
        </>
    );

}

export default Notification;