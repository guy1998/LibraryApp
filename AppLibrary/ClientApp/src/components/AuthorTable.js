import { useEffect, useState } from "react";
import "../assets/table.css";
import EditAuthor from './EditAuthor';

const sortAscending = function(authors){
    const sortedAuthors = authors.sort((a, b) => a.nrOfBooks - b.nrOfBooks);
    return sortedAuthors;
}

const sortDescending = function(authors){
    const sortedAuthors = authors.sort((a, b) => b.nrOfBooks - a.nrOfBooks);
    return sortedAuthors;
}

function AuthorTable({ authors, onAuthorDelete, onAuthorEdit }) {

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [element, setElement] = useState(<div></div>);
    const [authorList, setAuthorList] = useState(authors);
    const [clickCounter, setClickCounter] = useState(0);

    useEffect(()=>{
        setAuthorList(authors);
    }, [authors])

    let printedAuthors = authorList.length ? authorList.map((author, index) => {

        return (
            <tr key={index} className={selectedIndex === index ? "active" : ""} onClick={() => {
                setElement(<EditAuthor author={author} onAuthorEdit={onAuthorEdit} />)
                setSelectedIndex(index)
            }}>
                <td>{index + 1}</td>
                <td>{author.name}</td>
                <td>{author.bio}</td>
                <td>{author.nrOfBooks}</td>
                <td>{author.createdBy}</td>
                <td>{author.createdAt.slice(0, author.createdAt.length-9)}</td>
                <td>{<button className="deleteButton" onClick={(event) => {
                    event.stopPropagation();
                    if (window.confirm(author.name + " and all the books associated to this author will be deleted. Are you sure you want to proceed?") === true) {
                        fetch("/author/delete", {
                            method: "DELETE",
                            headers: {
                                'Content-Type': "application/json"
                            },
                            body: JSON.stringify(author)
                        })
                            .then((response) => {
                                if (response.ok) {
                                    onAuthorDelete();
                                    setElement(<div></div>)
                                } else {
                                    alert("Something went wrong");
                                }
                            })
                            .catch(error => {
                                console.log('Error:', error.message);
                            });
                    } else {
                        console.log("Canceled");
                    }
                }
                }></button>}</td>
            </tr>);
    }) : (
        <tr>
            <td colSpan={6} className="noResultRow">No authors yet</td>
        </tr>
        );

    const handleSearch = (event)=>{
        let contained = event.target.value;
        setAuthorList(authors.filter((author)=>{
            let name = author.name.toLowerCase();
            let search = contained.toLowerCase();
            return name.includes(search);
        }))
    }


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
                        onChange={handleSearch}
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
                                <th scope="col" onClick={
                                    ()=>{
                                        if(clickCounter === 0){
                                            setClickCounter(1);
                                            setAuthorList(sortAscending(authorList));
                                        }else if(clickCounter === 1){
                                            setClickCounter(0);
                                            setAuthorList(sortDescending(authorList));
                                        }
                                    }
                                }>Number of Books</th>
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