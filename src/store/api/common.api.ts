import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "../baseQueryWithReauth"

export const commonApi = createApi({
    reducerPath: "commonApi",
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})
