import { TypeNotification } from "../components/Notification/INotification"

export function addNotification(type: TypeNotification, message: string) {
  const event = new CustomEvent("addNotification", {
    detail: {
      type,
      message,
    },
  })
  document.dispatchEvent(event)
}
