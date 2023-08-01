import "../assets/addCard.css";
import "../assets/bookView.css";

function AddCard({category, openAddBook}) {

    return (
        <>
            <div className="bookCard" onClick={()=>{
                console.log("Something")
                openAddBook();
            }}>
                <div className="plusContainer"></div>
            </div>
        </>
    );

}

export default AddCard;