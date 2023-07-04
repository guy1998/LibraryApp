import "../assets/bookView.css";
import NavBar from "./NavBar";
import BookCard from "./BookCard";
import Catalogue from "./Catalogue";
import ToolBar from "./ToolBar";
import { useState } from "react";
import Popup from "./Popup";
import AddAuthorForm from "./AddAuthorForm";
import Filter from "./Filter";
import AddCategory from "./AddCategory";
import AddBookForm from "./AddBookForm";

function BookView() {

    const [showFilter, setShowFilter] = useState(false);
    const [showAddCat, setShowAddCat] = useState(false);
    const [showAddBook, setShowAddBook] = useState(false);
    const [showNote, setShowNote] = useState(false);

    //opens/closes filter popup
    const handleOpenFilter = () => {
        setShowFilter(true);
    };

    const handleCloseFilter = () => {
        setShowFilter(false);
    };

    //opens/closes book popup
    const openBook = () => {
        setShowAddBook(true);
    };

    const closeBook = () => {
        setShowAddBook(false);
    };

    //opens/closes category popup
    const openCategory = () => {
        setShowAddCat(true);
    };

    const closeCategory = () => {
        setShowAddCat(false);
    };

    //opens/closes note popup
    const openNote = () => {
        setShowNote(true);
    };

    const closeNote = () => {
        setShowNote(false);
    };

    return (
        <>
            <NavBar></NavBar>
            {showFilter && (
                <Popup SomeComponent={Filter} onClose={handleCloseFilter} />
            )}
            {showAddBook && (
                <Popup SomeComponent={AddBookForm} onClose={openBook} />
            )}
            {showAddCat && (
                <Popup SomeComponent={AddCategory} onClose={closeCategory} />
            )}
            <Catalogue />
            <ToolBar openFilter={handleOpenFilter} openBook={openBook} openCategory={openCategory} openNote={openNote}/>
        </>
    );

}


export default BookView;