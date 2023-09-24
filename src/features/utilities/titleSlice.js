import { createSlice } from "@reduxjs/toolkit";

const titleSlice = createSlice({
    name: 'title',
    initialState: {
        title: ''
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload
        },

    }
})

export default titleSlice.reducer
export const { setTitle } = titleSlice.actions
export const currentDocumentTitle = (state) => state.title.title