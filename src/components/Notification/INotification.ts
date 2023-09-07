export type TypeNotification = "success" | "error"

export interface INotification {
    id: number
    type: TypeNotification
    message: string
}
