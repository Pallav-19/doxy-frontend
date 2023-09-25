import React from 'react'
import { Navbar } from '../components/misc/Navbar'
import { Outlet } from 'react-router-dom'
import CookieConsent from '../components/CookieConsent'

const Home = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <CookieConsent />
        </>
    )
}

export default Home