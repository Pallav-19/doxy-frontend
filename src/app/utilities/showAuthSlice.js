import { createSlice } from "@reduxjs/toolkit";

const showAuthSlice = createSlice({
    name: 'showAuth',
    initialState: {
        show: false
    },
    reducers: {
        toggleShow: (state, action) => {
            state.show = !state.show;
        }
    }
})

export default showAuthSlice.reducer
export const { toggleShow } = showAuthSlice.actions
export const currentAuthShowState = (state) => state.showAuth.show