import axios from "axios";
import { useState, useEffect } from "react";

export default function ProductIndex(){
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        handleFetch();
    },[])

    async function handleFetch(){
        try{
            const response = await axios.get(`http://localhost:9090/api/products`);
            const result = response.data;
            setProducts(result);
        }
        catch(err){
            console.error("Error fetching:", err);
        }

    }

    const handleDelete = (id) =>{
        axios.delete(`http://localhost:9090/api/products/${id}`);
        handleFetch();
    }

    return (<>
        <h1>Products</h1>
        {
            products.map((prod, index)=>(
                <div key={index}>
                    <p >{prod.name} : {prod.description}: {prod.price} : {prod.quantity} </p>
                    <button className="btn btn-danger" onClick={() => handleDelete(prod.id)}>Delete</button>
                </div>

            ))
        }
    
    </>);
}


