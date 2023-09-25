/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from '@mui/material'
import React from 'react'
import MenuBar from '../components/ViewDocs/MenuBar'
import { DocsTable } from '../components/ViewDocs/DocsTable'
import { useDispatch, useSelector } from 'react-redux'
import { currentAllDocuments, loadDocuments } from '../features/documents/documentSlice'
import noData from "../assets/images/5928293_2953960.svg"
import { useGetAllDocumentsMutation } from '../app/api/document/documentApiSlice'
import { addNotification } from '../features/notifications/notificationSlice'
import { setLoading, unsetLoading } from '../features/utilities/loadingSlice'
const ViewDocs = () => {
    const allDocuments = useSelector(currentAllDocuments)
    const [getAllDocuments, { isLoading, error, isError }] = useGetAllDocumentsMutation()
    const dispatch = useDispatch()
    React.useEffect(() => {
        isLoading ? dispatch(setLoading()) : dispatch(unsetLoading())
        if (error) {
            dispatch(addNotification({ message: error?.data?.message, id: Date.now() }))
        }
    }, [isLoading, error, isError])
    React.useEffect(() => {

        getAllDocuments().then((res => {
            dispatch(loadDocuments({ results: res?.data?.result }))
        })).catch(err => {
            dispatch(addNotification({ id: Date.now(), message: "Error" }))
        })
    }, [])
    return (
        <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: { xs: '1rem', md: "3rem" }, gap: { xs: 4, md: 6 } }}>
            <MenuBar />
            {!isLoading && allDocuments?.length ? < Box sx={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }} >
                <Typography variant='h5' sx={{ marginRight: 'auto', mb: 4 }}>My Documents</Typography>
                <DocsTable />
            </Box> :
                <>
                    <Box sx={{
                        background: `url(${noData})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: 500,
                        width: "100%"
                    }}>

                    </Box>


                </>}
        </Box >
    )
}

export default ViewDocs