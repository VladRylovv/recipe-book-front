import { configureStore } from "@reduxjs/toolkit"
import { commonApi } from "./api/common.api"
import { authSlice } from "./auth/auth.slice"

export const store = configureStore({
    reducer: {
        [commonApi.reducerPath]: commonApi.reducer,
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(commonApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
