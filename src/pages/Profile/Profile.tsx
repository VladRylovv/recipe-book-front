import React, { useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSetTitle } from "../../helpers/hooks/useSetTitle"
import { useGetUserQuery } from "../../store/user/user.api"
import { useAppSelector } from "../../helpers/hooks/useAppSelector"
import { Button, ImageUser, Loader, Text } from "../../components/UI"
import { _URL } from "../../constants/api"
import styles from "./Profile.module.scss"

const Profile: React.FC = () => {
  useSetTitle("Profile")
  const { profileId } = useParams()
  const navigate = useNavigate()

  const {
    data: user,
    isLoading,
    isFetching,
  } = useGetUserQuery(profileId!, { skip: !profileId })
  const userStoreId = useAppSelector((state) => state.auth.user?.id)

  const showEditBtn = useMemo(() => {
    if (!user?.id || !userStoreId) return false

    return +user.id === +userStoreId
  }, [user, userStoreId])
  const avatarValue = useMemo(() => {
    if (!user?.avatar) return ""

    return `${_URL}${user.avatar}`
  }, [user?.avatar])

  if (isFetching || isLoading)
    return (
      <div className={styles.profile_wrap_loader}>
        <Loader />
      </div>
    )

  return (
    <div className={styles.profile_wrap}>
      <ImageUser src={avatarValue} />
      <div className={styles.profile_user_info}>
        <Text>Пользователь: {user.name || user.login}</Text>
        {user.email && <Text>Email: {user.email}</Text>}
      </div>
      {showEditBtn && (
        <Button
          className={styles.profile_edit_btn}
          size={"s"}
          view={"stroked"}
          label={"Редактировать"}
          onClick={() => navigate("/profile/edit")}
        />
      )}
    </div>
  )
}

export default Profile
