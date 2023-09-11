import { IDataToFormat } from "../IFormEditProfile"

export const formatDataEditProfile = (data: IDataToFormat): FormData => {
  const formatData = new FormData()

  formatData.append("id", String(data.id))
  formatData.append("login", data.login)
  if (data.image instanceof File) formatData.append("image", data.image)
  if (data.name) formatData.append("name", data.name)
  if (data.email) formatData.append("email", data.email)

  return formatData
}
