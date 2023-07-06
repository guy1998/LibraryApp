import "../assets/editAuthor.css";

function EditAuthor({author}){
    return(
        <form className="editAuthorForm">
            <label htmlFor='name'>Name:</label>
            <input type='text' name='name' value={author.name.split(" ")[0]}></input>
            <label htmlFor='surname'>Surname:</label>
            <input type='text' name='surname' value={author.name.split(" ")[1]}></input>
            <label htmlFor='bio'>Bio:</label>
            <input type='text' name='bio' value={author.bio}></input>
            <br></br>
            <button className="saveButton">Save</button>
            <button className='deleteButton'>Delete</button>
        </form>
    );
}

export default EditAuthor;