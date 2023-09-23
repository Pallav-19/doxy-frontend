/* eslint-disable no-unused-vars */
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { logout, setCredentials } from "../auth/authSlice"
import { addNotification } from '../notifications/notificationSlice';
const baseURL = process.env.NODE_ENV === "production" ? 'https://doxy-backend.onrender.com' : "http://localhost:9000"
const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        headers.set('Content-Type', 'application/json')
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.originalStatus === 403) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            api.dispatch(setCredentials({ user, ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
            const res = await baseQuery('/auth/logout', api, extraOptions)
            api.dispatch(addNotification({ id: Date.now(), message: "Session Expired! Login Again!" }))
        }
    }
    return result
}
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
