import "../assets/editAuthor.css";
import { React, useState, useEffect } from "react";


function getQueryString(author, newName, newBio) {
    const columnNames = [];
    const newValues = [];

    if (newBio !== author.bio) {
        columnNames.push("bio");
        newValues.push(newBio);
        author.bio = newBio;
    }

    if (newName !== author.name) {
        columnNames.push("name");
        newValues.push(newName);
        author.name = newName;
    }

    return new URLSearchParams({
        columnNames: columnNames.join(","),
        newValues: newValues.join(",")
    }).toString();
}

function getRequestOptions(author) {
   
    return{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(author)
        };
}

function EditAuthor({ author, onAuthorEdit }) {

    const [newName, setNewName] = useState(author.name);
    const [newBio, setNewBio] = useState(author.bio);

    useEffect(() => {
        setNewName(author.name);
        setNewBio(author.bio);
    }, [author]);

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleBioChange = (event) => {
        setNewBio(event.target.value);
    }

    return (
        <form className="editAuthorForm" onSubmit={(event) =>{
            event.preventDefault();
            const headerOptions = getRequestOptions(author);
            const queryString = getQueryString(author, newName, newBio);
            fetch(`/author/edit?${queryString}`, headerOptions)
                .then(response => {
                    if (response.ok) {
                        onAuthorEdit();
                        document.getElementById("saveBtn").disabled = true;
                    } else {
                        console.log(response);
                        console.log(response.text());
                        alert("Something is wrong");
                    }
                })
                .catch(error => {
                    console.log(error);
                })

        } }>
            <div className="editBox">
                <div>
                    <label htmlFor='name'>Name:</label><br></br>
                    <input type='text' name='name' value={newName} onChange={handleNameChange}></input>
                </div>
                <div>
                    <label htmlFor='bio'>Bio:</label><br></br>
                    <input type='text' name='bio' value={newBio} onChange={handleBioChange}></input>
                </div>
                <button className="saveButton" type='submit' id="saveBtn" disabled={newName === author.name && newBio === author.bio}></button>
            </div>
        </form>
    );
}

export default EditAuthor;