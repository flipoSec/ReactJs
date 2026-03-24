import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

export function DataTable({ data, columns, HandleSearch }) {
    return (
        <>
            <input 
                type="text" 
                placeholder="Search...." 
                className="form-control mb-3" 
                onChange={(e) => HandleSearch(e)}
            />
            <table className="table table-striped">
                <TableHeader columns={columns} />
                <tbody>
                    {data.map((row, index) => (
                        <TableRow key={row.id || index} row={row} columns={columns} />
                    ))}
                </tbody>
            </table>
        </>
    );
}









