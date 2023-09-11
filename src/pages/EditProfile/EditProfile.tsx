import React from "react"
import { useGetUserQuery } from "../../store/user/user.api"
import { useAppSelector } from "../../helpers/hooks/useAppSelector"
import { Loader } from "../../components/UI"
import FormEditProfile from "../../components/FormEditProfile/FormEditProfile"

const EditProfile: React.FC = () => {
  const userId = useAppSelector((state) => state.auth.user?.id)

  const {
    data: user,
    isLoading,
    isFetching,
  } = useGetUserQuery(String(userId), {
    skip: !userId,
  })

  if (isFetching || isLoading)
    return (
      <div>
        <Loader />
      </div>
    )

  return <FormEditProfile user={user} />
}

export default EditProfile
