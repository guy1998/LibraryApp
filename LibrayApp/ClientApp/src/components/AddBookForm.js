import "../assets/addBook.css";

function AddBookForm({ onClose }) {

    return (
        <>
            <form className="bookForm">
                <h1>Add Book</h1>
                <div className="form-floating mb-3 inputs">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        style={{ backgroundColor: "transparent" }}
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
                    />
                    <label htmlFor="floatingInput">Book ID</label>
                </div>
                <div className="form-floating inputs">
                    <textarea className="form-control" placeholder="Description here" id="floatingTextarea"></textarea>
                    <label htmlFor="floatingTextarea">Description</label>
                </div>
                <select className="form-select form-select-lg mb-3">
                    <option>Author</option>
                </select>
                <div className="categoryBox">
                <select className="form-select form-select-lg mb-3 categorySelect">
                    <option>Category</option>
                </select>
                <button className="otherCategoryButton"></button>
                </div>
                <input type="submit" value="Add" className="addBookButton" onClick={onClose}></input>
            </form>
        </>
    );

}

export default AddBookForm;