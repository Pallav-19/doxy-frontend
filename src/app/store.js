import { configureStore } from "@reduxjs/toolkit";
import showAuthSlice from "../features/utilities/showAuthSlice";
import authSlice from "../features/auth/authSlice";
import notificationSlice from "../features/notifications/notificationSlice";
import { apiSlice } from "./api/apiSlice";
import loadingSlice from "../features/utilities/loadingSlice";
import titleSlice from "../features/utilities/titleSlice";
import accessSlice from "../features/utilities/accessSlice";
import documentSlice from "../features/documents/documentSlice";
import accessDrawerSlice from "../features/utilities/accessDrawerSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        showAuth: showAuthSlice,
        auth: authSlice,
        notification: notificationSlice,
        loading: loadingSlice,
        title: titleSlice,
        access: accessSlice,
        document: documentSlice,
        accessDrawer: accessDrawerSlice

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})