import AuthorTable from "./AuthorTable";
import AddAuthorForm from "./AddAuthorForm";
import "../assets/reportPage.css";
import NavBar from "./NavBar";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Notification from "./Notification.js";

function ReportPage({ handleNotification }) {

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

    const [authors, setAuthors] = useState([]);
    const [authorAdded, setAuthorAdded] = useState(false);
    const [authorDeleted, setAuthorDeleted] = useState(false);
    const [authorEdited, setAuthorEdited] = useState(false);

    useEffect(() => {

        const fetchData = function(){
            fetch('/author/authors')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                if(Array.isArray(data))
                    setAuthors(data);
                else
                    setAuthors([]);
            })

            if(authorAdded){
                setAuthorAdded(false);
            }else if(authorDeleted){
                setAuthorDeleted(false);
            }else if(authorEdited){
                setAuthorEdited(false);
            }

        }

        const timeout = setTimeout(fetchData, 600); 
        return () => clearTimeout(timeout);
    }, [authorAdded, authorDeleted, authorEdited]);

    const handleAddAuthor = function () {
        handleNotification(<Notification response={true} message="Author added successfully" />);
        setAuthorAdded(true);
    }

    const handleRemoveAuthor = function () {
        handleNotification(<Notification response={true} message="Author deleted successfully" />);
        setAuthorDeleted(true);
    }

    const handleEditAuthor = function () {
        handleNotification(<Notification response={true} message="One author edited" />);
        setAuthorEdited(true);
    }

    return (
        <>
        <NavBar></NavBar>
            <div className="reportContainer">
                <AuthorTable authors={authors} onAuthorDelete={handleRemoveAuthor} onAuthorEdit={handleEditAuthor} />
                <AddAuthorForm onAuthorAdd={handleAddAuthor} />
        </div>
        </>
    );
}

export default ReportPage;