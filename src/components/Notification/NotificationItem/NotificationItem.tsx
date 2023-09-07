import React, { useCallback, useMemo } from "react"
import { Text } from "../../UI"
import { ReactComponent as IconClose } from "../../../assets/icons/close.svg"
import { INotificationItem } from "./INotificationItem"
import styles from "./NotificationItem.module.scss"

const NotificationItem: React.FC<INotificationItem> = ({
    id,
    type,
    message,
    onDelete,
}) => {
    const classes = useMemo(() => {
        const classType = styles[`notification_${type}`]

        return `${styles.notification_border} ${classType}`
    }, [styles, type])

    const handleDeleteNotification = useCallback(() => onDelete(id), [id])

    return (
        <div className={styles.notification_item_wrap}>
            <div className={classes} />
            <Text size={12}>{message}</Text>
            <IconClose
                className={styles.notification_btn_close}
                onClick={handleDeleteNotification}
            />
        </div>
    )
}

export default NotificationItem
