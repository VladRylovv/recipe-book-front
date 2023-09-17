import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../types/user.types"

type State = {
  user: User | null
  isAuth: boolean
  isLoaded: boolean
  isError: boolean
}

type PayloadInitUser = User
type PayloadEditUser = User
type PayloadChangeLoading = boolean

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    isAuth: false,
    isLoaded: false,
    isError: false,
  } as State,
  reducers: {
    initUser: (state, action: PayloadAction<PayloadInitUser>) => {
      state.user = action.payload
      state.isAuth = true
      state.isLoaded = false
    },
    changeLoadingLogin: (
      state,
      action: PayloadAction<PayloadChangeLoading>
    ) => {
      state.isLoaded = action.payload
    },
    editProfileStore: (state, action: PayloadAction<PayloadEditUser>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuth = false
    },
  },
})

export const { initUser, editProfileStore, logout, changeLoadingLogin } =
  authSlice.actions
