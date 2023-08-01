import "../assets/addBook.css";


function ChosenCategories({categories, handleRemoveCategory}) {

    return (
        <div className="chosenCategories">
                    {
                        categories.map((category) => {
                            return (
                                <div className="categorySlate">
                                    <h6 className="categoryNameSlate">{category}</h6>
                                    <button className="removeCategory" onClick={()=>{
                                        handleRemoveCategory(category)
                                    }}></button>
                                </div>
                            );
                        })
                    }
                </div>
    );

}

export default ChosenCategories;