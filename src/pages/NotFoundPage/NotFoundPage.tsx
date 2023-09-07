import React, { useCallback } from "react"
import { useNavigate, useRouteError } from "react-router-dom"
import { useSetTitle } from "../../helpers/hooks/useSetTitle"
import { Button, Text } from "../../components/UI"
import styles from "./NotFoundPage.module.scss"

const NotFoundPage: React.FC = () => {
    useSetTitle("Not found")

    const error = useRouteError()
    const navigate = useNavigate()

    const redirectMain = useCallback(() => navigate("/"), [])

    return (
        <div className={styles.not_found_wrap}>
            <Text className={styles.not_found_text} size={36}>
                {error?.status === 404 ? "Not found" : "Error"}
            </Text>
            <Button
                className={styles.not_found_btn}
                label={"Main"}
                onClick={redirectMain}
            />
        </div>
    )
}

export default NotFoundPage
