import { createSlice } from "@reduxjs/toolkit";

const accessDrawerSlice = createSlice({
    name: 'accessDrawer',
    initialState: {
        open: false,

    },
    reducers: {
        toggleAccessDrawer: (state, action) => {
            const { event, isOpen } = action.payload
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            state.open = isOpen
        },
        closeDrawer: (state, action) => {
            state.open = false
        },



    }

})

export default accessDrawerSlice.reducer
export const { toggleAccessDrawer, closeDrawer } = accessDrawerSlice.actions
export const currentAccessDrawerOpen = (state) => state.accessDrawer.open