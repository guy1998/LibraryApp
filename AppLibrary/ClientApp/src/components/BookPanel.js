import "../assets/bookPanel.css";
import "../assets/authorPanel.css";
import Book from "../images/book.png";
import { Link } from "react-router-dom";

function BookPanel() {
    return (
        <Link to="/bookPanel" style={{ textDecoration: 'none', color: 'white' }}>
        <div className="bookDiv">
            <div className="prompts">
                <h1>Book's page</h1>
                <ul>
                    <li>Manage your book stock.</li>
                    <li>Add or remove books.</li>
                    <li>Check books of each category.</li>
                    <li>Add or remove categories.</li>
                </ul>
            </div>
                <img src={Book} className="divImage"></img>
        </div>
        </Link>
    );
}

export default BookPanel;