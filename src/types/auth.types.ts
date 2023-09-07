import { User } from "./user.types"

export type ApiResponseLoginUser = {
    accessToken: string
    refreshToken: string
    user: User
}
export type ApiResponseCreateUser = {
    accessToken: string
    refreshToken: string
    user: User
}
