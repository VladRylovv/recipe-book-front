import { User } from "../../types/user.types"

export interface IFormEditProfile {
  user: User
}

export interface IDataToFormat {
  id: number | string
  login: string
  name?: string
  email?: string
  image?: File | string
}
