import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../types/user.types"

type State = {
    user: User | null
    isLoaded: boolean
    isError: boolean
}

type PayloadInitUser = User

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: null,
        isLoaded: false,
        isError: false,
    } as State,
    reducers: {
        initUser: (state, action: PayloadAction<PayloadInitUser>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
    },
})

export const { initUser, logout } = authSlice.actions
