import React from 'react'
import { Navbar } from '../components/misc/Navbar'
import { Outlet } from 'react-router-dom'
import CookieConsent from '../components/CookieConsent'
import { Box } from '@mui/material'

const Home = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh'
            }}>
            <Navbar />
            <Outlet />
            <CookieConsent />
        </Box>
    )
}

export default Home