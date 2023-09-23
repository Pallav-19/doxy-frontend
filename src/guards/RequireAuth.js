import React, {  } from 'react'
import { useSelector } from 'react-redux'
import { currentToken } from '../app/auth/authSlice'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = () => {
   
    const token = useSelector(currentToken)
    const location = useLocation()
    return (

        token ? <Outlet /> : <Navigate to={"/auth"} state={{ from: location }} replace />

    )
}

export default RequireAuth