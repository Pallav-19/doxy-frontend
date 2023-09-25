import { createSlice } from "@reduxjs/toolkit";

const accessSlice = createSlice({
    name: 'access',
    initialState: {
        isPubliclyEditable: false,
        isPubliclyViewed: false,
        collaborators: [],
        viewers: [],
        collaboratorsOptions: [],
        viewersOptions: [],
        isOwner: false,
    },
    reducers: {
        setPubliclyViewed: (state, action) => {
            state.isPubliclyViewed = action.payload
        },
        setIsPubliclyEditable: (state, action) => {
            state.isPubliclyEditable = action.payload
        },
        setCollaboratorOptions: (state, action) => {
            state.collaboratorsOptions = action.payload.collaboratorsOptions
        },

        setCollaborators: (state, action) => {
            state.collaborators = action.payload.collaborators
        },
        setViewerOptions: (state, action) => {
            state.viewersOptions = action.payload.viewersOptions
        },

        setViewers: (state, action) => {
            state.viewers = action.payload.viewers
        },
        setOwner: (state, action) => {
            state.isOwner = action.payload
        }

    }
})

export default accessSlice.reducer
export const { setPubliclyViewed, setIsPubliclyEditable, setCollaboratorOptions, setCollaborators, setViewerOptions, setViewers, setOwner } = accessSlice.actions
export const currentPubliclyViewed = (state) => state.access.isPubliclyViewed
export const currentPubliclyEditable = (state) => state.access.isPubliclyEditable
export const currentCollabOptions = (state) => state.access.collaboratorsOptions
export const currentCollaborators = (state) => state.access.collaborators
export const currentViewers = (state) => state.access.viewers
export const currentViewersOptions = (state) => state.access.viewersOptions
export const isWoner = (state) => state.access.isOwner