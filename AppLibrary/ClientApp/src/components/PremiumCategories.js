import { useEffect, useState } from "react";
import "../assets/categoryTable.css";


function PremiumCategories(){

    const [premium, setPremium] = useState([]);

    useEffect(()=>{

        fetch("/category/getpremium")
            .then(response =>{
                if(response.ok){
                    return response.json();
                }else{
                    alert("Something went wrong!");
                }
            })
            .then(data=>{
                if(Array.isArray(data))
                    setPremium(data);
            })

    })

    const items = premium.map((category, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{category.categoryName}</td>
                <td>{category.priority}</td>
                <td>{category.premium ? "Yes" : "No"}</td>
            </tr>
        );
    })

    return (
        <>
            <div className="backgroundOfContent">
                <h2 style={{marginLeft: "2vw"} }>Manage categories</h2>
                <div className="scrollingDiv customDiv">
                    <table className="table customTable table-hover">
                        <thead className="table-primary customTbHeader">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Category name</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Is premium</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

}

export default PremiumCategories;