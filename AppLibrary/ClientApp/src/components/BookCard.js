import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../assets/bookView.css";
import BookInfo from "./BookInfo";

const imported = require.context("../../../Uploads", true);

function BookCard({ book, onBookSelected }) {
  const categories = book.categories.join(" / ");

  return (
    <>
      <div
        onClick={() => {
          onBookSelected(book);
        }}
        id={book.id + ""}
        className={book.title.length > 17 ? "bookCard scrollable" : "bookCard"}
      >
        <img src={imported(book.imagePath)} className="bookImg"></img>
        <div className="titleContainer">
          <h5>{book.title}</h5>
        </div>
        <h6>{categories}</h6>
      </div>
    </>
  );
}

export default BookCard;
