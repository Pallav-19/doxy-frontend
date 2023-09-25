import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { currentUser } from '../features/auth/authSlice'

const Profile = () => {
    const user = useSelector(currentUser)
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Typography variant='h3'>
                {user.username}
            </Typography>
        </Box>
    )
}

export default Profile