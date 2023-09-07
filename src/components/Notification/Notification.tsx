import React, { useCallback, useEffect, useState } from "react"
import NotificationItem from "./NotificationItem/NotificationItem"
import { INotification } from "./INotification"
import styles from "./Notification.module.scss"

const Notification: React.FC = () => {
    const [notifications, setNotifications] = useState<INotification[]>([])

    const handleDeleteItem = useCallback((id: number) => {
        setNotifications((prev) => prev.filter((item) => item.id !== id))
    }, [])

    useEffect(() => {
        const cb = (e) => {
            const id = +new Date()

            const notification = {
                id,
                type: e.detail.type,
                message: e.detail.message,
            }

            setNotifications((prev) => [notification, ...prev])

            setTimeout(() => handleDeleteItem(id), 3000)
        }

        document.addEventListener("addNotification", cb)

        return () => document.removeEventListener("addNotification", cb)
    }, [])

    return (
        <div className={styles.notification_wrap}>
            {notifications.map((item) => {
                return (
                    <NotificationItem
                        key={item.id}
                        id={item.id}
                        type={item.type}
                        message={item.message}
                        onDelete={handleDeleteItem}
                    />
                )
            })}
        </div>
    )
}

export default Notification
