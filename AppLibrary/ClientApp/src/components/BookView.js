import "../assets/bookView.css";
import NavBar from "./NavBar";
import Catalogue from "./Catalogue";
import ToolBar from "./ToolBar";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Notification from "./Notification.js"
import Popup from "./Popup";
import Filter from "./Filter";
import AddCategory from "./AddCategory";
import AddBookForm from "./AddBookForm";
import CategoryTable from "./CategoryTable";
import BookInfo from "./BookInfo";
import PremiumCategories from "./PremiumCategories";

function BookView({ handleNotification }) {

    const history = useNavigate();
    const authenticated = localStorage.getItem("logged");

    useEffect(() => {
        if (authenticated === "false") {
            handleNotification(<Notification response={false} message="You need to login first!" />)
            history("/", { replace: true });
            // Redirect to login page
        } else {
            console.log("Vazhdo m");
        }
    }, [authenticated, history, handleNotification])

    const [showFilter, setShowFilter] = useState(false);
    const [showAddCat, setShowAddCat] = useState(false);
    const [showAddBook, setShowAddBook] = useState(false);
    const [showManageCategories, setShowManageCategories] = useState(false);
    const [changedView, setChangedView] = useState("Catalogue")
    const [showNote, setShowNote] = useState(false);
    const [bookAdded, setBookAdded] = useState(false);
    const [addBook2, setAddBook2] = useState(<div style={{display: "none"}}></div>)

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

    //opens/closes manage categories popup
    const handleOpenManage = () => {
        setShowManageCategories(true);
    };

    const handleCloseManage = () => {
        setShowManageCategories(false);
    };

    const handleBookAdded = function(){
        setBookAdded(true);
        setTimeout(()=>{
            setBookAdded(false);
        }, 200);
    }

    return (
        <>
            <NavBar></NavBar>
            {showFilter && (
                <Popup SomeComponent={Filter} onClose={handleCloseFilter} />
            )}
            {showNote && (
                <Popup SomeComponent={PremiumCategories} onClose={closeNote} />
            )}
            {showAddBook && (
                <Popup SomeComponent={AddBookForm} onClose={closeBook} options={handleBookAdded}/>
            )}
            {showAddCat && (
                <Popup SomeComponent={AddCategory} onClose={closeCategory} />
            )}
            {showManageCategories && (
                <Popup SomeComponent={CategoryTable} onClose={handleCloseManage} />
            )}
            {changedView === "Catalogue" && (
                <Catalogue onBookSelected={setChangedView} openAddBook={openBook} bookAdded={bookAdded} />
            )}
            {typeof (changedView) === "object" && (
                <BookInfo book={changedView} goBack={setChangedView} handleNotification={handleNotification} />
            )}
            {addBook2}
            <ToolBar openFilter={handleOpenFilter} openBook={openBook} openCategory={openCategory} openNote={openNote} openManage={handleOpenManage} />
        </>
    );

}


export default BookView;