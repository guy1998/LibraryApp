import "../assets/editBook.css";
import "../assets/addBook.css";
import { useState, useEffect } from "react";
import ChosenCategories from "./ChosenCategories.js";
import { stripHtml } from "string-strip-html";
import Notification from "./Notification";

const checkArrayEquality = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

const getColumnAndValues = (
  book,
  id,
  title,
  description,
  author,
  categories
) => {
  let columnNames = [];
  let newValues = [];
  let newCategories = [];

  if (title !== book.title) {
    columnNames.push("title");
    newValues.push(title);
  }

  if (description !== book.description) {
    columnNames.push("description");
    newValues.push(description);
  }

  if (author !== book.author.name) {
    columnNames.push("author");
    newValues.push(author);
  }

  if (!checkArrayEquality(categories, book.categories)) {
    newCategories = categories.slice();
  }

  if (id !== book.id) {
    columnNames.push("id");
    newValues.push("id");
  }

  if (columnNames.length !== 0 || newCategories.length !== 0)
    return {
      book: book,
      columnNames: columnNames,
      newValues: newValues,
      newCategories: newCategories,
    };
  else return {};
};

const getBody = (book, id, title, description, author, categories) => {
  const htmlFreeId = stripHtml(id).result;
  const htmlFreeTitle = stripHtml(title).result;
  const htmlFreeDescription = stripHtml(description).result;
  let body = {};

  if (
    htmlFreeDescription &&
    htmlFreeId &&
    htmlFreeTitle &&
    author &&
    categories
  ) {
    body = getColumnAndValues(
      book,
      htmlFreeId,
      htmlFreeTitle,
      htmlFreeDescription,
      author,
      categories
    );
  }

  return body;
};

const sendEditRequest = (
  book,
  id,
  title,
  description,
  author,
  categories,
  handleNotification,
  onBookEdit
) => {
  const body = getBody(book, id, title, description, author, categories);
  console.log(body);
  if (Object.keys(body).length > 0) {
    fetch("/book/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        handleNotification(
          <Notification
            response={true}
            message="The book was edited successfully!"
          />
        );
        return response.json();
      } else {
        console.log(response.text());
        handleNotification(
          <Notification
            response={false}
            message="Something went wrong! Try again later"
          />
        );
      }
    })
      .then(data=>{
        onBookEdit(data);
      })
  } else {
    handleNotification(
      <Notification
        response={false}
        message="One or more fields seem to be empty!"
      />
    );
  }
};

function EditBookForm({ book, onClose, handleNotification, onBookEdit }) {
  const handleClick = function (event) {
    const content = document.getElementById("editorContent");
    if (!content.contains(event.target)) {
      onClose();
    }
  };

  const [selectedCategories, setSelectedCategories] = useState(
    book.categories.slice()
  );

  const handleRemoveCategories = (removable) => {
    selectedCategories.splice(selectedCategories.indexOf(removable), 1);
    setSelectedCategories(selectedCategories);
    setDisplaySelected(
      <ChosenCategories
        categories={selectedCategories}
        handleRemoveCategory={handleRemoveCategories}
      />
    );
  };

  const [displaySelected, setDisplaySelected] = useState(
    <ChosenCategories
      categories={book.categories}
      handleRemoveCategory={handleRemoveCategories}
    />
  );
  const [authors, setAuthors] = useState([]);
  const [categoryChoices, setCategoryChoices] = useState([]);
  const [newTitle, setNewTitle] = useState(book.title);
  const [newId, setNewId] = useState(book.id);
  const [newDesc, setNewDesc] = useState(book.description);
  const [newAuthor, setNewAuthor] = useState(book.author.name);

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleIdChange = (event) => {
    setNewId(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewDesc(event.target.value);
  };

  const handleAuthorNameChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    if (selectedCategories.indexOf(newCategory)) {
      selectedCategories.push(event.target.value);
      setSelectedCategories(selectedCategories);
      setDisplaySelected(
        <ChosenCategories
          categories={selectedCategories}
          handleRemoveCategory={handleRemoveCategories}
        />
      );
    } else {
      handleNotification(
        <Notification
          response={false}
          message="You have already added this category!"
        />
      );
    }
  };

  useEffect(() => {
    fetch("/author/authors")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setAuthors(data);
      });

    fetch("/category/categories")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setCategoryChoices(data);
      });

    setDisplaySelected(
      <ChosenCategories
        categories={book.categories}
        handleRemoveCategory={handleRemoveCategories}
      />
    );
  }, []);

  return (
    <>
      <div className="popup" onClick={handleClick}>
        <form
          id="editorContent"
          className="bookForm"
          onSubmit={(event) => {
            event.preventDefault();
            sendEditRequest(
              book,
              newId,
              newTitle,
              newDesc,
              newAuthor,
              selectedCategories,
              handleNotification,
              onBookEdit
            );
          }}
        >
          <div className="mainFieldForm">
            <div className="leftSideForm">
              <div className="form-floating mb-3 inputs">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  style={{ backgroundColor: "transparent" }}
                  value={newTitle}
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
                  value={newId}
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
                  value={newDesc}
                  onChange={handleDescriptionChange}
                ></textarea>
                <label htmlFor="floatingTextarea">Description</label>
              </div>
            </div>
            <div className="rightSideForm">
              <select
                className="form-select form-select-lg mb-3"
                onChange={handleAuthorNameChange}
              >
                <option>{newAuthor}</option>
                {authors.map((author) => {
                  if (author.name !== newAuthor)
                    return <option>{author.name}</option>;
                })}
              </select>
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
          <button
            type="submit"
            className="saveBtn"
            disabled={
              newTitle === book.title &&
              newDesc === book.description &&
              newId === book.id &&
              newAuthor === book.author.name &&
              checkArrayEquality(selectedCategories, book.categories)
            }
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default EditBookForm;
