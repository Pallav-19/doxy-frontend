import { Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
    return (
        <div
            style={{
                height: '100vh',
                width: "100vw",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Typography variant='h5'>
                404 | Page Not Found
            </Typography>
        </div>
    )
}

export default NotFound