import "../assets/AddForm.css";
import { React, useState } from "react";

function AddAuthorForm({ onAuthorAdd }) {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [bio, setBio] = useState("");

    const handleNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleSurnameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleBioChange = (e) => {
        setBio(e.target.value);
    }

    const blankOut = function (inputs) {
        inputs.forEach((input) => {
            input.value = ''; // Clear the input value
        });
    };

    const handleSubmit = function (e) {

        e.preventDefault();

        if (!(firstname && lastname && bio)) {
            alert("One or more fields are empty");
            return false;
        }

        //removing any html characters or mysql injections
        const finalName = firstname.replace(/<[^>]+>/g, '').replace(/[\\$'"]/g, '\\$&');
        const finalSurname = lastname.replace(/<[^>]+>/g, '').replace(/[\\$'"]/g, '\\$&');
        const finalBio = bio.replace(/<[^>]+>/g, '').replace(/[\\$'"]/g, '\\$&');

        let authorData = {
            name: finalName + " " + finalSurname,
            bio: finalBio,
            nrOfBooks: 0,
            createdAt: (new Date()).toISOString().substr(0, 10),
            createdBy: JSON.parse(localStorage.getItem("user")).username
        };

        fetch('/author/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authorData)
        })
            .then(response => {
                if (response.ok) {
                    onAuthorAdd();
                    let inputs = document.getElementsByClassName("form-control");
                    blankOut(Array.from(inputs));
                } else {
                    alert(response.text());
                }
            })
            .catch(error => {
                console.log('Error:', error.message);
            });
    };

    return (
        <>
            <form className="addAuthorForm" onSubmit={handleSubmit}>
                <h2>Add an author</h2>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        style={{ backgroundColor: "transparent" }}
                        onChange={handleNameChange}
                    />
                    <label htmlFor="floatingInput">Author's first name <b className="requiredStar">*</b></label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        style={{ backgroundColor: "transparent" }}
                        onChange={handleSurnameChange}
                    />
                    <label htmlFor="floatingInput">Author's last name <b className="requiredStar">*</b></label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        style={{ backgroundColor: "transparent" }}
                        onChange={handleBioChange}
                    />
                    <label htmlFor="floatingInput">Author's bio <b className="requiredStar">*</b></label>
                </div>
                <button className="button" type="submit">
                    Add author
                </button>
            </form>
        </>
    );
}


export default AddAuthorForm;