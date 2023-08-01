import "../assets/photoChanger.css";
import "../assets/Popup.css";
import "../assets/bookInfo.css";
import Placeholder from "../images/placeholder.png";
import { useEffect, useState } from "react";

const imported = require.context("../../../Uploads", true);

const sendPhotoRequest = (photo, book, onClose, updatePhoto)=>{
    console.log(photo);
    const data = new FormData();
    data.append("fileName", photo.name);
    data.append("file", photo);
    data.append("bookId", book.id);
    console.log(data);
    fetch("/image/bookimg",{
        method: "POST",
        body: data,
      })
        .then(response=>{
            if(response.ok){
                setTimeout(()=>{
                    updatePhoto("./" + photo.name);
                    onClose();
                }, 800);
            }else{
                console.log(response.text());
                alert("Opss! Your photo did not get uploaded!");
            }
        })
}

function PhotoChanger({ currentPhoto, onClose, book, updatePhoto }){

    const [selectedFile, setSelectedFile] = useState(null);

    const handleClick = function (event) {
        const content = document.getElementById("changerContent");
        if (!content.contains(event.target)) {
            onClose();
        }
    } 

    const handleChange = (event) => {
        const file = event.target.files[0];
    
        if (file && file.type.startsWith('image/')) {
          setSelectedFile(file);
        } else {
          document.getElementById("photoUploader").value = '';
          setSelectedFile(null);
        }
      }; 

    useEffect(()=>{
        if(selectedFile)
            sendPhotoRequest(selectedFile, book, onClose, updatePhoto);
    }, [selectedFile]);

    return (
        <>
            <div className="popup" onClick={handleClick}>
                <div id="changerContent" className="changerContent">
                    <div className="imageContent">
                        <img src={currentPhoto ? imported(currentPhoto) : Placeholder}></img>
                    </div>
                    <form>
                        <label className="changePicture" htmlFor="photoUploader">Change picture</label>
                        <input id="photoUploader" name="file" type="file" onChange={handleChange}/>
                    </form>
                </div>
            </div>
        </>
    );

}

export default PhotoChanger;