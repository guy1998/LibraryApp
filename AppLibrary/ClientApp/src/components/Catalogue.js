import "../assets/bookView.css";
import BookCard from "./BookCard";
import React, { useState, useEffect } from "react";
import AddCard from "./AddCard.js";
import Notification from "./Notification.js";

function Catalogue({ onBookSelected, openAddBook, bookAdded }) {

    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {

        fetch("/category/categories")
            .then((response) => {
                return response.json();
            })
            .then(data => {
                setCategories(data);
            })


    }, []);

    useEffect(() => {
        const fetchData = () => {
            fetch("/book/books")
                .then((response) => response.json())
                .then((data) => {
                    setBooks(data);
                });
        };

        const timeout = setTimeout(fetchData, 400); 
        return () => clearTimeout(timeout); 
    }, [bookAdded]);

    const view = categories.map(element => {

        let temp = books.filter((book) => {
            return book.categories.includes(element.categoryName);
        });

        return (
            <div>
                <h3 className="categoryTitle">{element.categoryName}</h3>
                <div className="bookDivision">
                    {
                        temp.map((thisBook)=>{
                            return (
                                <BookCard key={thisBook.id} book={thisBook} onBookSelected={onBookSelected}></BookCard>
                            );
                        })
                    }
                    <AddCard category={element.categoryName} openAddBook={openAddBook} />
                </div>
            </div>
        );
    });

    return(
        <>
        <div className="catalogue">
            {view}
        </div>
        </>
    );
}

export default Catalogue;