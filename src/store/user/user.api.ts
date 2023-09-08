import { commonApi } from "../api/common.api"
import { GET_USER, USER } from "../../constants/api"
import { User } from "../../types/user.types"

export const userApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<User, string>({
            query: (id) => ({
                url: `${USER}${GET_USER}/${id}`,
            }),
        }),
    }),
})

export const { useGetUserQuery } = userApi
