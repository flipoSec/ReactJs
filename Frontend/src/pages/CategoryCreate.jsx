import axios from "axios";
import { useState } from "react";


export default function CategoryIndex(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");


    const handleInput = (e) =>{
       setName(e.target.value); 
    }
    const handleDes = (e) =>{
        setDescription(e.target.value);
    }

    const handleAdd = () => {
        axios.post(`http://localhost:9090/api/categories`, {name, description});
        setName("");
        setDescription("");

    }

    return(<>
    <div className="mb-3">
        <label htmlFor="" className="form-label">Category: </label>
        <input className="form-control" value={name} type="text"  onChange={(e) => handleInput(e)}/>
        <label htmlFor="" className="form-label">Description: </label>
        <input className="form-control" value={description} type="text"   onChange={(e) => handleDes(e)}/>
    </div>

        <button className="btn btn-primary" onClick={() => handleAdd()}>Add</button>
    
    </>);
}