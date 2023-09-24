/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { Outlet } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useRefreshMutation } from "../../app/api/auth/authApiSlice"
import { currentToken, setCredentials } from "../../features/auth/authSlice"
const PersistentUserLogin = () => {
    const token = useSelector(currentToken)
    const [refresh, { isLoading }] = useRefreshMutation()
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        const RefreshToken = async () => {
            try {
                const { data } = await refresh()
                dispatch(setCredentials({ user: data.user, token: data.token }))
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false)
            }
        }
        !token ? RefreshToken() : setLoading(false)
    }, [])
    return (
        <>  {isLoading || loading ? <CircularProgress sx={{ position: 'absolute', top: "50%", left: '50%', transform: "translate('-50%',-50%)" }} /> : <Outlet />}</>

    )
}

export default PersistentUserLogin