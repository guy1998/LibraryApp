import "../assets/addCategory.css";
import { React, useState } from "react";

function AddCategory({ onClose }) {
  const [categoryName, setCategoryName] = useState("");
  const [priority, setPriority] = useState(-1);
  const [premium, setPremium] = useState(false);

  const handleNameChange = function (e) {
    setCategoryName(e.target.value);
  };

  const handlePriorityChange = function (e) {
    setPriority(e.target.value);
  };

  const handlePremiumChange = function (){
      setPremium(!(premium))
  }

  const handleSubmit = function (e) {
    e.preventDefault();

    if (priority === -1 || !categoryName) {
      alert("One or more fields are empty");
      return false;
    }

    const finalCategoryName = categoryName
      .replace(/<[^>]+>/g, "")
      .replace(/[\\$'"]/g, "\\$&");

    const categoryData = {
      categoryName: finalCategoryName,
      priority: priority,
      createdAt: new Date().toISOString().substr(0, 10),
      createdBy: JSON.parse(localStorage.getItem("user")).username,
      premium: premium
    };

    fetch("/category/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    })
      .then((response) => {
        if (response.ok) {
          onClose();
          window.location.reload();
        } else if (response.status === 401) {
          alert("This category already exists");
        } else {
          alert("Something went wrong! Try again later");
        }
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  };

  return (
    <>
      <form className="categoryForm" onSubmit={handleSubmit}>
        <h2>Add Category</h2>
        <div className="addCategoryMainField">
          <div className="form-floating mb-3 inputs">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              style={{ backgroundColor: "transparent" }}
              onChange={handleNameChange}
            />
            <label htmlFor="floatingInput">Category name</label>
          </div>
          <select
            className="form-select form-select-lg mb-3"
            onChange={handlePriorityChange}
          >
            <option>Priority</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          <div className="checkBoxDiv">
            <label for="check">Is premium</label>
            <input id="check" type="checkbox" value="premium" onChange={handlePremiumChange}/>
          </div>
        </div>
        <input type="submit" value="Add" className="addCategoryButton"></input>
      </form>
    </>
  );
}

export default AddCategory;
