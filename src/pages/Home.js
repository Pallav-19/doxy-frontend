import React from 'react'
import { Navbar } from '../components/misc/Navbar'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Home