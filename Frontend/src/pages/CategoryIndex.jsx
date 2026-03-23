import axios from "axios";
import { useEffect, useState } from "react";



export default function CategoryIndex(){
    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        handleFetch();
    },[])

    const handleFetch = async () =>{
        const response = await axios.get(`http://localhost:9090/api/categories`);
        const result = response.data;
        setCategories(result);

    }
    const handleDelete = async (id)=>{
        {
            await axios.delete(`http://localhost:9090/api/categories/${id}`);
            
            // setCategories(categories.filter((cat)=>(
            //             cat.id !== id
            //         )
            //     )
            // )
            
            handleFetch();
        }
    }


    return(<>
        <h1>Categories</h1>
        {
            categories.map((categorie, index)=>(
                <div key={index}>
                    <p >{categorie.name} - {categorie.description}</p>
                    <button className="btn btn-danger" onClick={() => handleDelete(categorie.id)}>Delete</button>
                </div>
            ))
            
        }

    
    </>);
}