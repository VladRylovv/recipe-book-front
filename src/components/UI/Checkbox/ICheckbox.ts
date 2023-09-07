export interface ICheckbox {
    className?: string
    label: string
    checked: boolean
    onChange: (value: boolean) => void
}
