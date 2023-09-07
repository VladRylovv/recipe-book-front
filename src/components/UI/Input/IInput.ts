export interface IInput {
    name?: string
    className?: string
    label?: string
    placeholder?: string
    value: string
    type?: "text" | "email" | "password" | "textarea"
    error?: string | null
    onChange: (value: string, e) => void
}
