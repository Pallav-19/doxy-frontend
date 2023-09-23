import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: '',
    token: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload
            state.token = token
            state.user = user
        }
    }
})

export default authSlice.reducer
export const { setCredentials } = authSlice.actions
export const currentUser = (state) => state.auth.user
export const currentToken = (state) => state.auth.token