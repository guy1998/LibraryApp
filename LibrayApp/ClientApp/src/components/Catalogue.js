import "../assets/bookView.css";
import BookCard from "./BookCard";

const categories = ["Fantasy", "Adventure", "Thriller", "Drama", "Comedy"];

const books= [];

for (let i = 1; i <= 9; i++) {
  const id = i;
  const title = i % 3 === 0 ? `Very long title so you can see the scroll` : `Title ${id}`;
  const description = `Description for Book ${id}`;
  const img = `../src/images/books.png`;
  const createdAt = new Date().toISOString();
  const createdBy = "John Doe";
  
  const book = {
    id,
    title,
    description,
    img,
    categories,
    createdAt,
    createdBy,
  };

  books.push(book);
}

function Catalogue(){

    const view = categories.map(element => {
        
        let temp = books.filter((book)=>{
            return book.categories.includes(element);
        });

        return (
            <div>
                <h3 className="categoryTitle">{element}</h3>
                <div className="bookDivision">
                    {
                        temp.map((thisBook)=>{
                            return(
                                <BookCard key={thisBook.id} book={thisBook}></BookCard>
                            );
                        })
                    }
                </div>
            </div>
        );
    });

    console.log(view);

    return(
        <>
        <div className="catalogue">
            {view}
        </div>
        </>
    );
}

export default Catalogue;