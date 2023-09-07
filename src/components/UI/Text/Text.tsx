import React, { PropsWithChildren, useMemo } from "react"
import { IText } from "./IText"
import styles from "./Text.module.scss"

const Text: React.FC<PropsWithChildren<IText>> = ({
    className = "",
    children,
    size = 14,
    color = "primary",
    type = "regular",
    component = "p",
    onClick = () => {},
}) => {
    const classesText = useMemo(() => {
        const colorClass = styles[`text-color-${color}`]
        const sizeClass = styles[`text-size-${size}`]
        const typeClass = styles[`text-type-${type}`]

        return `${className} ${colorClass} ${sizeClass} ${typeClass}`
    }, [className, size, color, type])

    if (component === "span")
        return (
            <span className={classesText} onClick={onClick}>
                {children}
            </span>
        )

    return (
        <p className={classesText} onClick={onClick}>
            {children}
        </p>
    )
}

export default Text
