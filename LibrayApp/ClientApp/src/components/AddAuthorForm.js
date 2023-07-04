import "../assets/AddForm.css";

function AddAuthorForm() {
    return (
        <>
            <form className="addAuthorForm">
                <h2>Add an author</h2>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        style={{ backgroundColor: "transparent" }}
                    />
                    <label htmlFor="floatingInput">Author's first name <b className="requiredStar">*</b></label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        style={{ backgroundColor: "transparent" }}
                    />
                    <label htmlFor="floatingInput">Author's last name <b className="requiredStar">*</b></label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        style={{ backgroundColor: "transparent" }}
                    />
                    <label htmlFor="floatingInput">Author's bio <b className="requiredStar">*</b></label>
                </div>
                <button type="button" className="button">
                    Add author
                </button>
            </form>
        </>
    );
}


export default AddAuthorForm;