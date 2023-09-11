import { commonApi } from "../api/common.api"
import { DELETE_AVATAR, EDIT_USER, GET_USER, USER } from "../../constants/api"
import { User } from "../../types/user.types"

export const userApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => ({
        url: `${USER}${GET_USER}/${id}`,
      }),
    }),
    editUser: builder.mutation<User, FormData>({
      query: (data) => ({
        url: `${USER}${EDIT_USER}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAvatar: builder.mutation<any, any>({
      query: (id) => ({
        url: `${USER}${DELETE_AVATAR}`,
        method: "DELETE",
        body: {
          id,
        },
      }),
    }),
  }),
})

export const { useGetUserQuery, useEditUserMutation, useDeleteAvatarMutation } =
  userApi
