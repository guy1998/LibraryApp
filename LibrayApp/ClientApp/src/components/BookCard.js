import { useEffect, useRef } from "react";
import "../assets/bookView.css";

function BookCard({ book }) {

    const categories = book.categories.join(' / ');

    return (
        <>
            <div id={book.id+""} className={book.title.length > 25 ? "bookCard scrollable" : "bookCard"}>
                <img src={book.img} className="bookImg"></img>
                <div className="titleContainer">
                    <h5>{book.title}</h5>
                </div>
                <h6>{categories}</h6>
            </div>
        </>
    );
}

export default BookCard;