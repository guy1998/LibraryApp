import { useState } from "react";
import "../assets/bookInfo.css";
import EditBookForm from "./EditBookForm";
import PhotoChanger from "./PhotoChanger";

const imported = require.context("../../../Uploads", true);

const deleteBook = (book)=>{

    fetch("/book/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
        .then(response=>{
            if(response.ok){
                window.location.reload();
            }else{
                alert("Could not delete sir!");
            }
        })
        .catch(error=>{
            console.log(error);
        })

}


function BookInfo({ book, goBack, handleNotification }) {

    const [popup, setPopup] = useState(<div style={{display: "none"}}></div>)
    const [path, setPath] = useState(book.imagePath);
    const [displayedBook, setDisplayBook] = useState(book);

    const handleOnEditBook = (newBook)=>{
        setDisplayBook(newBook);
    }

    const closePopup = ()=>{
        setPopup(<div style={{display: "none"}}></div>);
    }

    const changePath = (newPath)=>{
        setPath(newPath);
    }

    return (
        <>
            <div className="mainFieldBookInfo">
                <div className="leftDivision">
                    <img src={imported(path)}></img>
                    <div className="buttonBox">
                        <button className="changePicture" onClick={()=>{setPopup(<PhotoChanger currentPhoto={path} book={book} onClose={closePopup} updatePhoto={changePath} />)}}>Change picture</button>
                        <button className="deleteBook" onClick={()=>{
                            deleteBook(book);
                        }}>Delete Book</button>
                        <button className="goBackCatalogue" onClick={()=>goBack("Catalogue")}>Go back</button>
                    </div>
                </div>
                <div className="rightDivision">
                    <div className="innerRight">
                        <h1 className="bookTitle">{displayedBook.title}</h1>
                        <h5>Book id: {displayedBook.id}</h5>
                        <h5>Written by: {displayedBook.author.name}</h5>
                        <h5>Description: </h5>
                        <p>{displayedBook.description}</p>
                        <button className="editBook" onClick={() => { setPopup(<EditBookForm book={displayedBook} onClose={closePopup} handleNotification={handleNotification} onBookEdit={handleOnEditBook} />) }}></button>
                    </div>
                </div>
            </div>
            {popup}
        </>
    );

}

export default BookInfo;