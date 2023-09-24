import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = true
        },
        unsetLoading: (state, payload) => {
            state.loading = false;
        }
    }
})

export default loadingSlice.reducer
export const { setLoading, unsetLoading } = loadingSlice.actions
export const isLoading = (state) => state.loading.loading 