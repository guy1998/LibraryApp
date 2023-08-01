import "../assets/Login.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification.js";

const handleTransition = () => {
    document.documentElement.style.setProperty("--signDisplay", "block");
    document.documentElement.style.setProperty("--logDisplay", "none");
}

const createHeaderOptions = (username, password) => {

    let array = [username, password];

    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password })
    };
}

function LoginForm({ handleNotification }) {

    const history = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

  return (
      <>
          <form className="form" id="log" onSubmit={
              (event) => {
                  event.preventDefault();
                  document.getElementById("floatingPassword").style.borderColor = "transparent";
                  document.getElementById("floatingInput").style.borderColor = "transparent";
                  if (username && password) {
                      const headerOptions = createHeaderOptions(username, password);
                      fetch("/login/log", headerOptions)
                          .then(response => {
                              if (response.ok) {
                                  handleNotification(<Notification response={true} message="Welcome sir" />)
                                  return response.json();
                              } else if (response.status === 404) {
                                  handleNotification(<Notification response={false} message="User does not exist" />)
                                  document.getElementById("floatingInput").style.borderColor = "red";
                                  return "sth";
                              } else if (response.status === 401) {
                                  handleNotification(<Notification response={false} message="The password entered is not correct" />)
                                  document.getElementById("floatingPassword").style.borderColor = "red";
                                  return "sth";
                              } else {
                                console.log(response);
                                  handleNotification(<Notification response={false} message="Something went wrong! Please try again later!" />)
                                  return "sth";
                              }
                          })
                          .then(data => {
                              if (data !== "sth") {
                                  console.log(data);
                                  localStorage.setItem("logged", true);
                                  localStorage.setItem("user", JSON.stringify(data));
                                  localStorage.setItem("profilePath", data.imagePath);
                                  history("/home");
                              }
                          })
                          .catch(error => {
                              console.log(error);
                          })
                  } else {
                      if (username) {
                          document.getElementById("floatingPassword").style.borderColor = "red";
                      } else {
                          document.getElementById("floatingInput").style.borderColor = "red";
                      }
                  }
                  
              }
          }>
              <h1>My library app</h1>
              <h2>Log-In</h2>
              <div className="fields">
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
              <button type="submit" className="button">
                  Log-in
              </button>
              <h6>You do not have an account? <u onClick={handleTransition}>Sign-up now!</u></h6>
          </form>
      </>
  );
}

export default LoginForm;
