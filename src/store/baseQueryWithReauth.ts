import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { logout } from "./auth/auth.slice"
import { AUTH, REFRESH, URL_API } from "../constants/api"
import { ApiResponseRefreshToken } from "../types/auth.types"
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query"

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
      `${AUTH}${REFRESH}`,
      api,
      extraOptions
    )

    const refreshData = refreshResult.data as ApiResponseRefreshToken

    if (refreshData?.accessToken) {
      localStorage.setItem("accessToken", refreshData.accessToken)
      result = await baseQuery(args, api, extraOptions)
    } else {
      localStorage.removeItem("accessToken")
      api.dispatch(logout)
    }
  }
  return result
}
