import { changeLoadingLogin, initUser } from "./auth.slice"
import { commonApi } from "../api/common.api"
import {
  AUTH,
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH,
} from "../../constants/api"
import {
  ApiResponseCreateUser,
  ApiResponseLoginUser,
  ApiResponseRefreshToken,
} from "../../types/auth.types"

const authApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      ApiResponseLoginUser,
      { login: string; password: string }
    >({
      query: ({ login, password }) => ({
        url: `${AUTH}${LOGIN_USER}`,
        method: "POST",
        body: {
          login,
          password,
        },
        credentials: "include",
      }),
      async onQueryStarted(arg, api) {
        api.dispatch(changeLoadingLogin(true))

        try {
          const res = await api.queryFulfilled
          const user = res.data.user
          const accessToken = res.data.accessToken

          localStorage.setItem("accessToken", accessToken)
          api.dispatch(initUser(user))
        } catch (e) {
          api.dispatch(changeLoadingLogin(false))
          console.error(e)
        }
      },
    }),
    createUser: builder.mutation<
      ApiResponseCreateUser,
      { login: string; password: string }
    >({
      query: ({ login, password }) => ({
        url: `${AUTH}${CREATE_USER}`,
        method: "POST",
        body: {
          login,
          password,
        },
      }),
      async onQueryStarted(arg, api) {
        api.dispatch(changeLoadingLogin(true))

        try {
          const res = await api.queryFulfilled
          const user = res.data.user
          const accessToken = res.data.accessToken

          localStorage.setItem("accessToken", accessToken)
          api.dispatch(initUser(user))
        } catch (e) {
          api.dispatch(changeLoadingLogin(false))
          console.error(e)
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${AUTH}${LOGOUT_USER}`,
        method: "POST",
      }),
      onQueryStarted() {
        localStorage.removeItem("accessToken")
      },
    }),
    refreshToken: builder.query<ApiResponseRefreshToken, void>({
      query: () => ({
        url: `${AUTH}${REFRESH}`,
      }),
      async onQueryStarted(arg, api) {
        api.dispatch(changeLoadingLogin(true))

        try {
          const res = await api.queryFulfilled
          const user = res.data.user
          const accessToken = res.data.accessToken

          localStorage.setItem("accessToken", accessToken)
          api.dispatch(initUser(user))
        } catch (e) {
          api.dispatch(changeLoadingLogin(false))
          console.error(e)
        }
      },
    }),
  }),
})

export const {
  useLoginUserMutation,
  useCreateUserMutation,
  useLogoutMutation,
  useLazyRefreshTokenQuery,
} = authApi
