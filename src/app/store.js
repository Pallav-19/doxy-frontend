import { configureStore } from "@reduxjs/toolkit";
import showAuthSlice from "./utilities/showAuthSlice";
import authSlice from "./auth/authSlice";
import notificationSlice from "./notifications/notificationSlice";

export const store = configureStore({
    reducer: {
        showAuth: showAuthSlice,
        auth: authSlice,
        notification: notificationSlice
    }
})