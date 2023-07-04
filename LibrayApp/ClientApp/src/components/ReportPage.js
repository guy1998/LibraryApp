import AuthorTable from "./AuthorTable";
import AddAuthorForm from "./AddAuthorForm";
import "../assets/reportPage.css";
import NavBar from "./NavBar";

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function ReportPage() {

    const authors = [];

    for (let i = 1; i <= 100; i++) {
        const author = {
            fullname: `Author ${i}`,
            bio: `Bio of Author ${i}`,
            numberOfBooks: getRandomNumber(1, 10),
            createdBy: `User ${getRandomNumber(1, 10)}`,
            createdAt: `${getRandomNumber(2000, 2023)}-${getRandomNumber(1, 12)}-${getRandomNumber(1, 28)}`,
        };

        authors.push(author);
    }

    return (
        <>
        <NavBar></NavBar>
        <div className="reportContainer">
            <AuthorTable authors={authors}/>
            <AddAuthorForm />
        </div>
        </>
    );
}

export default ReportPage;