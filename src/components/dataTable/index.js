import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './styles.scss';

const DataTable1 = ({ Tabledata, searchTerm, columns }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(Tabledata); 
    }, [Tabledata]);

    const filteredData = data.filter(item =>
        columns.some(col => {
            if (typeof col.selector === 'function') {
                const value = col.selector(item)?.toString().toLowerCase();
                return value?.includes(searchTerm.toLowerCase());
            }
            return false;
        })
    );

    return (
        <div>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
            />
        </div>
    );
};

export default DataTable1;