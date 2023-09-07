import { INotification } from "../INotification"

export interface INotificationItem extends INotification {
    onDelete: (id: number) => void
}
