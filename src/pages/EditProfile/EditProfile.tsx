import React from "react"
import { useAppSelector } from "../../helpers/hooks/useAppSelector"
import FormEditProfile from "../../components/FormEditProfile/FormEditProfile"

const EditProfile: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user)

  return <FormEditProfile user={user} />
}

export default EditProfile
