import React, { ReactComponentElement } from "react";
import "../assets/Popup.css";
import { useState } from "react";
import Notification from "./Notification";

function Popup({ SomeComponent, onClose, options }) {
  const [notification, setNotification] = useState(
    <div style={{ display: "none" }}></div>
  );

  const handleNotification = (note) => {
    setNotification(note);
    setTimeout(() => {
      setNotification(<div style={{ display: "none" }}></div>);
    }, 4000);
  };

  const handleClick = function (event) {
    const content = document.getElementById("popupContent");
    if (!content.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className="popup" id="allPopup" onClick={handleClick}>
      <div className="popup-content" id="popupContent">
        {
          SomeComponent?.name === "AddBookForm" ? 
          <SomeComponent
          onClose={onClose}
          handleNotification={handleNotification}
          handleBookAdded ={options}
        />
          : <SomeComponent
          onClose={onClose}
          handleNotification={handleNotification}
        />
        }
        {notification}
      </div>
    </div>
  );
}

export default Popup;
