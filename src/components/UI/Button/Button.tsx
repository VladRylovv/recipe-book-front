import React, { useMemo } from "react"
import { Loader, Text } from "../index"
import { IButton } from "./IButton"
import styles from "./Button.module.scss"

const Button: React.FC<IButton> = ({
    disabled = false,
    className = "",
    label,
    loading,
    onClick,
}) => {
    const classesButton = useMemo(() => {
        return `${className} ${styles.button} ${
            loading ? styles.button_loading : ""
        }`
    }, [className, styles, loading])

    return (
        <div className={classesButton} onClick={onClick}>
            {loading ? (
                <Loader size={"s"} />
            ) : (
                <Text color={"secondary"}>{label}</Text>
            )}
        </div>
    )
}

export default Button
