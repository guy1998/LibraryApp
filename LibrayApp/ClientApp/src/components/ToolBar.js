import { useState } from "react";
import "../assets/bookView.css";

function ToolBar({openFilter, openBook, openCategory, openNote}) {

    return (
        <div className="toolBar">
            <ul className="toolButtons">
                <li id="filter" className="toolOptions" onClick={openFilter}></li>
                <li id="addBook" className="toolOptions" onClick={openBook}></li>
                <li id="addCat" className="toolOptions" onClick={openCategory}></li>
                <li id="note" className="toolOptions" onClick={openNote}></li>
            </ul>
        </div>
    );
}

export default ToolBar;