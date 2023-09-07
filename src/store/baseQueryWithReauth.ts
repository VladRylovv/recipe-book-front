import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { URL_API } from "../constants/api"
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query"
import { logout } from "./auth/auth.slice"

const baseQuery = fetchBaseQuery({
    baseUrl: URL_API,
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem("accessToken")

        if (accessToken) {
            headers.set("authorization", `Bearer ${accessToken}`)
        }

        return headers
    },
    credentials: "include",
})
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery(
            "/auth/refreshToken",
            api,
            extraOptions
        )
        if (refreshResult.data.accessToken) {
            localStorage.setItem("accessToken", refreshResult.data.accessToken)
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout)
        }
    }
    return result
}
