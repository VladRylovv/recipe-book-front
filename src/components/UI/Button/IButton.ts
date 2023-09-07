export interface IButton {
    disabled?: boolean
    className?: string
    label: string
    loading?: boolean
    onClick: () => void
}
