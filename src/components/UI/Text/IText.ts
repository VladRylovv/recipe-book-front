import { Color, FontSize } from "../../../types/global"

export interface IText {
    className?: string
    color?: Color
    size?: FontSize
    type?: "regular" | "bold"
    onClick?: () => void
    component?: "p" | "span"
}
