import React, { useMemo } from "react"
import { Loader, Text } from "../index"
import { IButton } from "./IButton"
import styles from "./Button.module.scss"

const Button: React.FC<IButton> = ({
    disabled = false,
    className = "",
    label,
    view = "filled",
    loading,
    size = "m",
    onClick,
}) => {
    const classesButton = useMemo(() => {
        const sizeClass = styles[`button_button_size_${size}`]

        return `${className} ${styles.button} ${
            loading ? styles.button_loading : ""
        } ${view === "stroked" ? styles.button_stroked : ""} ${sizeClass}`
    }, [className, styles, loading, size, view])

    return (
        <div className={classesButton} onClick={onClick}>
            {loading ? (
                <Loader size={"s"} />
            ) : (
                <Text
                    color={view === "stroked" ? "primary" : "white"}
                    size={size === "s" ? 12 : 14}
                    type={"bold"}
                >
                    {label}
                </Text>
            )}
        </div>
    )
}

export default Button
