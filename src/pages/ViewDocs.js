import { Box } from '@mui/material'
import React from 'react'
import MenuBar from '../components/ViewDocs/MenuBar'
// import { DocsTable } from '../components/ViewDocs/DocsTable'

const ViewDocs = () => {
    return (
        <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "3rem" }}>
            <MenuBar />
            {/* <DocsTable /> */}
        </Box>
    )
}

export default ViewDocs