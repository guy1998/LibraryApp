import "../assets/addCategory.css";

function AddCategory({ onClose }) {

    return (
        <>
            <form className="categoryForm">
                <h2>Add Category</h2>
                <div className="form-floating mb-3 inputs">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        style={{ backgroundColor: "transparent" }}
                    />
                    <label htmlFor="floatingInput">Category name</label>
                </div>
                <select className="form-select form-select-lg mb-3">
                    <option>Priority</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
                <input type="submit" value="Add" className="addCategoryButton" onClick={onClose}></input>
            </form>
        </>
    );

}

export default AddCategory;