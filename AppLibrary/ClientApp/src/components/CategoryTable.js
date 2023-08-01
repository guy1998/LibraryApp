import "../assets/categoryTable.css";
import { useState, useEffect } from "react";
import EditCategory from "./EditCategory.js";
import Notification from "./Notification";

function CategoryTable({handleNotification}) {

    const [deletedOrEdited, setDeletedOrEdited] = useState(false); 
    const [categories, setCategories] = useState([]);
    const [element, setElement] = useState(<div style={{ display: "none" }} ></div>)

    const handleEdit = function(){
        setDeletedOrEdited(true);
        setElement(<div style={{ display: "none" }} ></div>)
    }

    useEffect(() => {

        const fetchData = function(){
            fetch("/category/categories")
            .then(response => {
                fetch("/category/categories")
                    .then((response) => {
                        return response.json();
                    })
                    .then(data => {
                        setCategories(data);
                    })
            })

        setDeletedOrEdited(false);
        }

        const timeout = setTimeout(fetchData, 600); 
        return () => clearTimeout(timeout); 

    }, [deletedOrEdited])

    const items = categories.map((category, index) => {
        return (
            <tr key={index} onClick={() => {
                setElement(<EditCategory category={category} onCategoryEdit={handleEdit} />);
            }}>
                <td>{index + 1}</td>
                <td>{category.categoryName}</td>
                <td>{category.priority}</td>
                <td>{category.premium ? "Yes" : "No"}</td>
                <td><button className="deleteButton" onClick={(event) => {
                    event.stopPropagation();
                    fetch("/category/delete", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(category)
                    })
                        .then(response => {
                            if (response.ok) {
                                setElement(<div style={{ display: "none" }} ></div>)
                                handleNotification(<Notification response={true} message="Category was deleted successfully!" />);
                                setDeletedOrEdited(true);
                                // window.location.reload();
                            } else {
                                console.log(response);
                                alert("Something went wrong! Try again later");
                            }
                        })
                }}></button></td>
            </tr>
        );
    })

    return (
        <>
            <div className="backgroundOfContent">
                <h2 style={{marginLeft: "2vw"} }>Manage categories</h2>
                <div className="scrollingDiv customDiv">
                    <table className="table customTable table-hover">
                        <thead className="table-primary customTbHeader">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Category name</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Is premium</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </div>
                {element}
            </div>
        </>
    );

}

export default CategoryTable;