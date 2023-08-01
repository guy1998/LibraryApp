import "../assets/profileInfo.css";
import { useNavigate } from "react-router-dom";
import User from "../images/user.png";
import Notification from "./Notification";
import { useEffect, useState } from "react";
import { stripHtml } from "string-strip-html";

let imported = require.context("../../../Uploads", true);

const getBody = function (photo, admin) {
  const fileName = photo.name;
  const file = photo;
  const data = new FormData();
  data.append("fileName", fileName);
  data.append("file", file);
  data.append("username", admin.username);

  return data;
};

const sendPhotoRequest = (photo, admin, handleNotification) => {
  const body = getBody(photo, admin);
  fetch("/image/userimg", {
    method: "POST",
    body: body,
  })
    .then((response) => {
      if (response.ok) {
        handleNotification(
          <Notification
            response={true}
            message="Photo uploaded successfully!"
          />
        );
      } else {
        handleNotification(
          <Notification
            response={false}
            message="Something went wrong! Please try again later!"
          />
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const getInfoBody = (admin, newUsername, newName)=>{
    const htmlFreeUsername = stripHtml(newUsername).result;
    const htmlFreeName = stripHtml(newName).result;
    const columns = [];
    const values = [];

    if(htmlFreeName && htmlFreeName !== admin.name){
        columns.push('name');
        values.push(htmlFreeName);
    }

    if(htmlFreeUsername && htmlFreeUsername !== admin.username){
        columns.push('username');
        values.push(htmlFreeUsername);
    }

    if(columns.length > 0){
        return {
            username: admin.username,
            columnNames: columns,
            newValues: values
        };
    }
    
    return {};
}

const sendChangeInfoRequest = (admin, newUsername, newName, handleNotification, callback) => {
    const body = getInfoBody(admin, newUsername, newName);
  
    if (Object.keys(body).length > 0) {
      console.log(body);
      fetch("/admin/change", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            handleNotification(
              <Notification response={false} message="Information changed successfully" />
            );
            response.json().then((data) => {
              callback(null, data);
            });
          } else {
            console.log(response);
            handleNotification(
              <Notification
                response={false}
                message="Something went wrong! Please try again later!"
              />
            );
            callback(new Error("Request failed"));
          }
        })
        .catch((error) => {
          console.error(error);
          callback(error);
        });
    } else {
      handleNotification(
        <Notification
          response={false}
          message="One or more fields are empty! Or you tried to be malicious"
        />
      );
      callback(new Error("Fields are empty or malicious attempt"));
    }
  };

function ProfileInfo({ admin, handleNotification }) {
  const history = useNavigate();
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePath") ? imported(localStorage.getItem("profilePath")) : "./user.png"
  );
  const [newName, setNewName] = useState(admin.name);
  const [newUsername, setNewUsername] = useState(admin.username);

  const handleLogout = () => {
    localStorage.setItem("logged", false);
    localStorage.setItem("profilePath", "");
    history("/", { replace: true });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handlePhotoChange = (event) => {
    let photo = event.target.files[0];
    if (photo && photo.type.startsWith("image/")) {
      sendPhotoRequest(photo, admin, handleNotification);
      setTimeout(() => {
        imported = require.context("../../../Uploads", true);
        localStorage.setItem("profilePath", "./" + photo.name);
        setProfilePic(imported("./" + photo.name));
      }, 2000);
    } else {
      handleNotification(
        <Notification response={false} message="Please enter an image!" />
      );
    }
  };

  return (
    <>
      <aside className="profileSide">
        <h1>Hello {newName}</h1>
        <div className="ancestor">
          <img className="profilePic" src={profilePic}></img>
          <label htmlFor="changeProfilePic" id="changeLabel" />
          <input
            type="file"
            id="changeProfilePic"
            onChange={handlePhotoChange}
          />
        </div>
        <h4>Personal infromation</h4>
        <div className="personalBox">
          <div className="col-3">
            <input
              className="effect-7"
              type="text"
              placeholder="Name"
              onChange={handleNameChange}
              value={newName}
            />
            <span className="focus-border">
              <i></i>
            </span>
          </div>
          <div className="col-3">
            <input
              className="effect-7"
              type="text"
              placeholder="Username"
              onChange={handleUsernameChange}
              value={newUsername}
            />
            <span className="focus-border">
              <i></i>
            </span>
          </div>
        </div>
        <div className="btnDiv">
          <button
            id="profileBtn"
            className="profileBtn"
            disabled={newName === admin.name && newUsername === admin.username}
            onClick={
                ()=>{
                    sendChangeInfoRequest(admin, newUsername, newName, handleNotification, (error, data) => {
                        if (error) {
                          console.error(error);
                        } else {
                          localStorage.setItem('user', JSON.stringify(data));
                          window.location.reload();
                        }
                      });
                      setTimeout(()=>{
                        setNewName(admin.name);
                        setNewUsername(admin.username);
                      }, 200)
                }
            }
          ></button>
          <button className="passButton">Change your password</button>
        </div>
        <div className="settings">
          <div className="toggle">
            <input type="checkbox" id="toggle" />
            <label htmlFor="toggle"></label>
          </div>
          <ul className="help">
            <li className="helpIcon"></li>
            <li onClick={()=>{
                console.log(admin.name);
            }}>Help</li>
            <li className="logOutIcon" onClick={handleLogout}></li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default ProfileInfo;
