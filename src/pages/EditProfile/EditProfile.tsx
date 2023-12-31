import React from "react"
import { useGetUserQuery } from "../../store/user/user.api"
import { useAppSelector } from "../../helpers/hooks/useAppSelector"
import { Loader, Text } from "../../components/UI"
import FormEditProfile from "../../components/FormEditProfile/FormEditProfile"
import styles from "./EditProfile.module.scss"

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
      <div className={styles.edit_profile_loader_wrap}>
        <Loader />
      </div>
    )

  if (!user) return <Text>Not found user</Text>

  return <FormEditProfile user={user} />
}

export default EditProfile
