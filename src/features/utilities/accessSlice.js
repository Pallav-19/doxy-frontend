import { createSlice } from "@reduxjs/toolkit";

const accessSlice = createSlice({
    name: 'access',
    initialState: {
        isPubliclyEditable: false,
        isPubliclyViewed: false
    },
    reducers: {
        setPubliclyViewed: (state, action) => {
            state.isPubliclyViewed = action.payload
        },
        setIsPubliclyEditable: (state, action) => {
            state.isPubliclyEditable = action.payload
        }
    }
})

export default accessSlice.reducer
export const { setPubliclyViewed, setIsPubliclyEditable } = accessSlice.actions
export const currentPubliclyViewed = (state) => state.access.isPubliclyViewed
export const currentPubliclyEditable = (state) => state.access.isPubliclyEditable