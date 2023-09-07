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
            transformResponse(
                baseQueryReturnValue: ApiResponseLoginUser
            ): Promise<ApiResponseLoginUser> | ApiResponseLoginUser {
                localStorage.setItem(
                    "accessToken",
                    baseQueryReturnValue.accessToken
                )

                return baseQueryReturnValue
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
            transformResponse(
                baseQueryReturnValue: ApiResponseLoginUser
            ): Promise<ApiResponseLoginUser> | ApiResponseLoginUser {
                localStorage.setItem(
                    "accessToken",
                    baseQueryReturnValue.accessToken
                )

                return baseQueryReturnValue
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `${AUTH}${LOGOUT_USER}`,
                method: "POST",
            }),
            transformResponse(
                baseQueryReturnValue: void
            ): Promise<void> | void {
                localStorage.setItem("accessToken", "")

                return baseQueryReturnValue
            },
        }),
        refreshToken: builder.query<any, void>({
            query: () => ({
                url: `${AUTH}${REFRESH}`,
            }),
            transformResponse(
                baseQueryReturnValue: ApiResponseLoginUser
            ): Promise<ApiResponseLoginUser> | ApiResponseLoginUser {
                localStorage.setItem(
                    "accessToken",
                    baseQueryReturnValue.accessToken
                )

                return baseQueryReturnValue
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
