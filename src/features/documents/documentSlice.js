import { createSlice } from "@reduxjs/toolkit";

const documentSlice = createSlice({
    name: 'document',
    initialState: {
        allDocuments: []
    },
    reducers: {
        loadDocuments: (state, action) => {
            state.allDocuments = action.payload.results
        }
    }
})

export default documentSlice.reducer
export const { loadDocuments } = documentSlice.actions
export const currentAllDocuments = (state) => state.document.allDocuments