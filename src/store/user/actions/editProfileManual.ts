import { userApi } from "../user.api"
import { User } from "../../../types/user.types"

export const editProfileManual = (dispatch, user: User): void => {
  dispatch(
    userApi.util.updateQueryData("getUser", String(user.id), () => {
      console.log(JSON.parse(JSON.stringify(user)))
      return user
    })
  )
}
