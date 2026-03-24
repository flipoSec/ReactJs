export function TableHeader({ columns }) {
    return (
        <thead>
            <tr>
                {columns.map((col, index) => (
                    <th key={col.name || index}>{col.label}</th>
                ))}
            </tr>
        </thead>
    );
}