import "../assets/filter.css";

function Filter({onClose}) {
    return (
        <>
            <form className="filterForm">
                <h2>Filter</h2>
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
                    <label htmlFor="floatingInput">Author</label>
                </div>
                <select className="form-select form-select-lg mb-3">
                    <option>Category</option>
                </select>
                <div className="form-floating mb-3 inputs">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        style={{ backgroundColor: "transparent" }}
                    />
                    <label htmlFor="floatingInput">Admin that added</label>
                </div>
                <input type="submit" className="filterButton" value="Filter" onClick={onClose}></input>
            </form>
        </>
    );
}

export default Filter;