import { TableCell } from "./TableCell";

export function TableRow({ row, columns }) {
    return (
        <tr>
            {columns.map((column, index) => (
                <TableCell key={index}>
                    {
                        (column?.render && column.render(row)) 
                        || row[column.name] 
                        || ''
                    }
                </TableCell>
            ))}
        </tr>
    );
}
