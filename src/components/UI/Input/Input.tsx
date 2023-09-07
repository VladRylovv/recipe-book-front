import React, { useId, useMemo } from "react"
import { Text } from "../index"
import { IInput } from "./IInput"
import styles from "./Input.module.scss"

const Input: React.FC<IInput> = ({
    label,
    placeholder,
    className = "",
    value,
    type = "text",
    error = null,
    name,
    onChange,
}) => {
    const inputId = useId()

    const classesInput = useMemo(() => {
        return `${className} ${styles.input_wrap} ${
            error ? styles.input_error : ""
        }`
    }, [className, styles, error])

    return (
        <div className={classesInput}>
            {label && (
                <label htmlFor={inputId}>
                    <Text className={styles.input_label}>{label}</Text>
                </label>
            )}
            {type === "textarea" ? (
                <textarea
                    id={inputId}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={(e) => onChange(e.target.value, e)}
                />
            ) : (
                <input
                    id={inputId}
                    autoComplete={"off"}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value, e)}
                />
            )}
            {error && (
                <Text color={"alert"} size={12}>
                    {error}
                </Text>
            )}
        </div>
    )
}

export default Input
