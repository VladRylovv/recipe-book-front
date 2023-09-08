import React, { useMemo } from "react"
import { useParams } from "react-router-dom"
import { useSetTitle } from "../../helpers/hooks/useSetTitle"
import { useGetUserQuery } from "../../store/user/user.api"
import { useAppSelector } from "../../helpers/hooks/useAppSelector"
import { Button, ImageUser, Loader, Text } from "../../components/UI"
import styles from "./Profile.module.scss"

const Profile: React.FC = () => {
    useSetTitle("Profile")
    const { profileId } = useParams()

    const { data: user, isLoading, isFetching } = useGetUserQuery(profileId)
    const userStoreId = useAppSelector((state) => state.auth.user?.id)

    const showEditBtn = useMemo(() => {
        if (!user?.id || !userStoreId) return false

        return +user.id === +userStoreId
    }, [user, userStoreId])

    if (isFetching || isLoading)
        return (
            <div>
                <Loader />
            </div>
        )

    return (
        <div className={styles.profile_wrap}>
            <ImageUser />
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
                />
            )}
        </div>
    )
}

export default Profile
