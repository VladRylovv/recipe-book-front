export interface IButton {
    disabled?: boolean
    className?: string
    view?: "stroked" | "filled"
    label: string
    loading?: boolean
    size?: "s" | "m" | "l"
    onClick: () => void
}
