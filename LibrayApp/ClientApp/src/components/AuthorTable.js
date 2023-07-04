import { useState } from "react";
import "../assets/table.css";
import EditAuthor from './EditAuthor';

function AuthorTable({ authors }) {

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [element, setElement] = useState(<div></div>);

    let printedAuthors = authors.map((author, index) => {
        return (
            <tr className={selectedIndex === index ? "active" : ""} onClick={() => {
                setElement(<EditAuthor author={author} />)
                setSelectedIndex(index)
            }}>
                <td>{index + 1}</td>
                <td>{author.fullname}</td>
                <td>{author.bio}</td>
                <td>{author.numberOfBooks}</td>
                <td>{author.createdBy}</td>
                <td>{author.createdAt}</td>
            </tr>);
    });


    return (
        <>
            <div>
                <div className="overTable">
                    <h1 className="tableTitle">Author List</h1>
                    <div className="form-floating mb-3 searchBox">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder=""
                        style={{ backgroundColor: "transparent" }}
                    />
                    <label htmlFor="floatingInput">Search</label>
                </div>
                </div>
                <div className="scrollingDiv">
                    <table className="table customTable table-hover">
                        <thead className="table-primary customTbHeader">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Fullname</th>
                                <th scope="col">Bio</th>
                                <th scope="col">Number of Books</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {printedAuthors}
                        </tbody>
                    </table>
                </div>
                {element}
            </div>
        </>
    );

}

export default AuthorTable;