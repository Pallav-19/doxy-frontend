/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { currentAllDocuments } from '../../features/documents/documentSlice';
import { documentColumns } from '../../constants/documentColumns';

export function DocsTable() {
    const allDocumets = useSelector(currentAllDocuments)
    const getRowId = (row) => row._id;
    return (
        <div style={{
            height: 450,
            maxWidth: '100%',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '0.5rem'
        }}>
            <DataGrid
                getRowId={getRowId}
                rows={allDocumets}
                columns={documentColumns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}
