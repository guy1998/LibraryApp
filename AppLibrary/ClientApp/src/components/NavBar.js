import "../assets/navbar.css"
import { Link } from "react-router-dom";


function NavBar() {
    return (
        <>
            <nav className="mainNavigation">
                <h2 className="custom-heading">MyLibrary App</h2>
                <ul className="navList">
                    <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}><li className="navItem">Home</li></Link>
                    <Link to="/bookPanel" style={{ textDecoration: 'none', color: 'white' }}><li className="navItem">Books</li></Link>
                    <Link to="/authorPanel" style={{ textDecoration: 'none', color: 'white' }}><li className="navItem">Report</li></Link>
                </ul>
            </nav>
        </>
    );
}


export default NavBar;