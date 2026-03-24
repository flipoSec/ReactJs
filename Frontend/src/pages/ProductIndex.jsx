import axios from "axios";
import { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable/DataTable";

export default function ProductIndex() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        handleFetch();
    }, [search]);

    async function handleFetch() {
        try {
            // Updated to use the correct search endpoint
            const response = await axios.get(`http://localhost:9090/api/products/search?name=${search}`);
            setProducts(response.data);
        } catch (err) {
            console.error("Error fetching:", err);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9090/api/products/${id}`);
            handleFetch(); 
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const columns = [
        { name: "id", label: "ID" },
        { name: "name", label: "Product Name" },
        { name: "description", label: "Description" },
        { name: "price", label: "Price ($)" },
        { name: "quantity", label: "Stock" },
        {
            label: "Actions",
            render: (row) => (
                <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(row.id)}
                >
                    Remove
                </button>
            )
        }
    ];

    return (
        <div className="container mt-4">
            <h1>Product Management</h1>
            <hr />
            <DataTable 
                data={products} 
                columns={columns} 
                HandleSearch={(e) => setSearch(e.target.value)} 
            />
        </div>
    );
}

