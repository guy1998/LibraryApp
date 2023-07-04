import ProfileInfo from "./ProfileInfo";
import AuthorPanel from "./AuthorPanel";
import BookPanel from "./BookPanel";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function HomePage(){

    const admin1= {
        name: "Aldrin",
        surname: "Cifliku",
        username: "Guy_1989",
        profilePic: "../images/user.png",
      };

    return (
        <div style={{ backgroundColor: "white", height: "100vh", width: "100vw", display: "flex" }}>
            <ProfileInfo admin={admin1}></ProfileInfo>
            <div>
                <AuthorPanel></AuthorPanel>
                <BookPanel></BookPanel>
            </div>
        </div>
    );
}


export default HomePage;