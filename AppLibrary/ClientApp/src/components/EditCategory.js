import "../assets/categoryTable.css";
import { useState, useEffect } from "react";
import { stripHtml } from "string-strip-html";

function EditCategory({ category, onCategoryEdit }) {

    const getHeaderOptions = () => {


        let columns = [];
        let values = [];

        if (newPriority !== category.priority) {
            columns.push("priority");
            values.push(newPriority);
        }

        if (newName && newName !== category.categoryName) {
            columns.push("categoryname");
            values.push(newName);
        }

        return {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ categoryName: category.categoryName, columnNames: columns, columnValues: values })
        }
    }

    const [newName, setNewName] = useState(category.categoryName);
    const [newPriority, setNewPriority] = useState(category.priority);

    useEffect(() => {
        setNewName(category.categoryName);
        setNewPriority(category.priority);
    }, [category])

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    const handlePriorityChange = (e) => {
        setNewPriority(e.target.value);
    }

    return (
        <>
            <form className="editCategoryForm" onSubmit={(event) => {
                event.preventDefault();
                const headerOptions = getHeaderOptions();
                fetch("/category/edit", headerOptions)
                    .then(response => {
                        if (response.ok) {
                            onCategoryEdit();
                            alert("Category edited successfully!");
                        } else {
                            console.log(response);
                            alert("Something went wrong! Try again later");
                        }
                    })
                
            }}>
                <div className="editCategoryBox">
                    <div>
                        <label htmlFor='name'>Category name:</label><br></br>
                        <input type='text' name='name' value={newName} onChange={handleNameChange}></input>
                    </div>
                    <div>
                        <label htmlFor='bio'>Priority:</label><br></br>
                        <select value={newPriority} onChange={handlePriorityChange}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <button className="saveButton customButton" type='submit' id="saveBtn" disabled={newName === category.categoryName && newPriority === category.priority && newName}></button>
                </div>
            </form>
        </>
    )

}

export default EditCategory;