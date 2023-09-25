import { Link } from "react-router-dom";

export const documentColumns = [
    {
        field: 'title', headerName: 'Title', renderCell: (params) => {

            return (
                <>
                    <Link onClick={() => { 
                        
                    }} to={`/${params.row._id}`}>
                        {params?.row?.title}
                    </Link>
                </>
            )
        }, width: 250
    },
    {
        field: 'createdBy', headerName: 'Owner', renderCell: (params) => {
            return (
                <>
                    {params?.row?.createdBy?.username}
                </>
            )
        }, width: 200
    },
    {
        field: 'createdAt', headerName: 'Created At',

        renderCell: (params) => {
            return (
                <>
                    {new Date(params.row.createdAt).toLocaleString()}
                </>
            )
        }, width: 250
    },

    {
        field: 'updatedAt',
        headerName: 'Last Updated At',

        renderCell: (params) => {
            return (
                <>
                    {new Date(params.row.updatedAt).toLocaleString()}
                </>
            )
        }, width: 250
    },
    {
        field: 'lastUpdatedBy', headerName: 'Last Updated By', renderCell: (params) => {
            return (
                <>
                    {params.row?.lastUpdatedBy?.username}
                </>
            )
        }, width: 200
    },
];
