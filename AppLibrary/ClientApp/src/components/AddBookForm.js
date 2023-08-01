import "../assets/addBook.css";
import { useState, useEffect } from "react";
import { stripHtml } from "string-strip-html";
import ChosenCategories from "./ChosenCategories";
import Notification from "./Notification";

const getBody = (id, title, description, author, category, file) => {
  const htmlFreeId = stripHtml(id).result;
  const htmlFreeTitle = stripHtml(title).result;
  const htmlFreeDescription = stripHtml(description).result;

  if (
    htmlFreeId &&
    htmlFreeTitle &&
    htmlFreeDescription &&
    category.length &&
    author
  ) {
    return {
      id: htmlFreeId,
      title: htmlFreeTitle,
      description: htmlFreeDescription,
      imagePath: file ? "./" + file.name :"./books.png",
      createdAt: new Date().toISOString().substr(0, 10),
      createdBy: JSON.parse(localStorage.getItem("user")).username,
      author: {
        name: author,
        bio: "",
        createdAt: new Date().toISOString().substr(0, 10),
        nrOfBooks: 0,
        createdBy: "kot",
      },
      categories: category,
    };
  }

  return {};
};

const sendBookRequest = (body, onClose, handleNotification, photo, handleBookAdded) => {
  if (Object.keys(body).length > 0) {
    fetch("/book/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        handleNotification(
          <Notification response={true} message="Book was added successfully" />
        );
        if(photo){
            console.log(photo.name);
            sendPhotoRequest(photo);
        }
        handleBookAdded();
        onClose();
        //window.location.reload();
      } else if (response.status === 401) {
        handleNotification(
            <Notification response={true} message="Book already exists" />
          );
      } else {
        console.log(response.text());
        handleNotification(
            <Notification response={true} message="Something went wrong! Please try again later!" />
        );
      }
    });
  } else {
    handleNotification(
      <Notification response={false} message="One or more fields are empty" />
    );
  }
};

const sendPhotoRequest = (body) => {

    const data = new FormData();
    data.append("fileName", body.name);
    data.append("file", body);
    fetch("/book/photo",{
        method: "POST",
        body: data,
      })
        .then(response=>{
            if(response.ok){

            }else{
                console.log(response.text());
                alert("Opss! Your photo did not get uploaded!");
            }
        })

};

function AddBookForm({ onClose, handleNotification, handleBookAdded }) {
  const [authors, setAuthors] = useState([]);
  const [categoryChoices, setCategoryChoices] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [displaySelected, setDisplaySelected] = useState(
    <div style={{ display: "none" }}></div>
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      document.getElementById("photoUploader").value = '';
      setSelectedFile(null);
      handleNotification(<Notification response={false} message="You need to select an image" />);
    }
  };  

  const handlAuthorNameChange = (event) => {
    setAuthorName(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    if(selectedCategories.indexOf(newCategory)){
        selectedCategories.push(event.target.value);
        setSelectedCategories(selectedCategories);
        setDisplaySelected(<ChosenCategories categories={selectedCategories} handleRemoveCategory={handleRemoveCategory}/>);
    }else{
        handleNotification(<Notification response={false} message="You have already added this category!"/>)
    }
  };

  const handleRemoveCategory = (removable)=>{
        selectedCategories.splice(selectedCategories.indexOf(removable), 1);
        setSelectedCategories(selectedCategories);
        setDisplaySelected(<ChosenCategories categories={selectedCategories} handleRemoveCategory={handleRemoveCategory}/>)
  }

  useEffect(() => {
    fetch("/author/authors")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        if(Array.isArray(data))
          setAuthors(data);
        else
          setAuthors([]);
      });

    fetch("/category/categories")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        if(Array.isArray(data))
          setCategoryChoices(data);
        else
          setCategoryChoices([]);
      });
  }, []);

  return (
    <>
      <form
        className="bookForm"
        onSubmit={(event) => {
          event.preventDefault();
          const body = getBody(
            id,
            title,
            description,
            authorName,
            selectedCategories,
            selectedFile
          );
          sendBookRequest(body, onClose, handleNotification, selectedFile, handleBookAdded)
        }}
      >
        <h1 className="addFormHeader">Add Book</h1>
        <div className="mainFieldForm">
        <div className="leftSideForm">
          <div className="form-floating mb-3 inputs">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              style={{ backgroundColor: "transparent" }}
              onChange={handleTitleChange}
            />
            <label htmlFor="floatingInput">Title</label>
          </div>
          <div className="form-floating mb-3 inputs">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              style={{ backgroundColor: "transparent" }}
              onChange={handleIdChange}
            />
            <label htmlFor="floatingInput">Book ID</label>
          </div>
          <div className="form-floating inputs">
            <textarea
              className="form-control"
              placeholder="Description here"
              id="floatingTextarea"
              onChange={handleDescriptionChange}
            ></textarea>
            <label htmlFor="floatingTextarea">Description</label>
          </div>
        </div>
        <div className="rightSideForm">
            <select
            className="form-select form-select-lg mb-3"
            onChange={handlAuthorNameChange}
            >
            <option>Author</option>
            {authors.map((author) => {
                return <option>{author.name}</option>;
            })}
            </select>
            <label htmlFor="photoUploader" className="photoUploader form-control">
                <p className="iconic"></p>
                <p>{selectedFile ? selectedFile.name : "Select the book cover"}</p>
            </label>
            <input type="file" className="form-control" id="photoUploader" onChange={handleFileChange}/>
            <select
                className="form-select form-select-lg mb-3 categorySelect"
                onChange={handleCategoryChange}
            >
                <option>Category</option>
                {categoryChoices.map((category) => {
                return <option>{category.categoryName}</option>;
                })}
            </select>
            {displaySelected}
        </div>
        </div>
        <button type="submit" className="addBookButton">
          Add
        </button>
      </form>
    </>
  );
}

export default AddBookForm;
