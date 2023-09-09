import { commonApi } from "../api/common.api"
import { EDIT_USER, GET_USER, USER } from "../../constants/api"
import { User } from "../../types/user.types"

export const userApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => ({
        url: `${USER}${GET_USER}/${id}`,
      }),
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: `${USER}${EDIT_USER}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
})

export const { useGetUserQuery, useEditUserMutation } = userApi
