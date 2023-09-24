import { Link } from "react-router-dom";

export const documentColumns = [
    {
        field: 'title', headerName: 'Title', renderCell: (params) => {

            return (
                <>
                    <Link to={`/${params.row._id}`}>
                        {params?.row?.title}
                    </Link>
                </>
            )
        }, width: 300
    },
    {
        field: 'createdBy', headerName: 'Owner', renderCell: (params) => {
            return (
                <>
                    {params?.row?.createdBy?.username}
                </>
            )
        }, width: 270
    },
    {
        field: 'createdAt', headerName: 'Created At',

        renderCell: (params) => {
            return (
                <>
                    {new Date(params.row.createdAt).toLocaleString()}
                </>
            )
        }, width: 300
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
        }, width: 300
    },
    {
        field: 'lastUpdatedBy', headerName: 'Last Updated By', renderCell: (params) => {
            return (
                <>
                    {params.row?.lastUpdatedBy?.username}
                </>
            )
        }, width: 300
    },
];
