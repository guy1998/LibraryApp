import { Link } from "react-router-dom";
import "../assets/authorPanel.css";
import Quill from "../images/quill.png";

function AuthorPanel() {
    return (
        <Link to="/authorPanel" style={{ textDecoration: 'none', color: 'white' }}>
        <div className="authorDiv">
            <div className="prompts">
                <h1>Report page</h1>
                <ul>
                    <li>Manage your authors.</li>
                    <li>Add a new author.</li>
                    <li>Edit existing ones.</li>
                    <li>Remove authors that you do not use.</li>
                </ul>
            </div>
                <img src={Quill} className="divImage"></img>
        </div>
        </Link>
    );
}

export default AuthorPanel;