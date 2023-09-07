import React, { useId, useMemo } from "react"
import { Text } from "../index"
import { ReactComponent as IconCheck } from "../../../assets/icons/check.svg"
import { ICheckbox } from "./ICheckbox"
import styles from "./Checkbox.module.scss"

const Checkbox: React.FC<ICheckbox> = ({
    className = "",
    label,
    checked,
    onChange,
}) => {
    const checkboxId = useId()

    const classes = useMemo(() => {
        return `${styles.checkbox_wrap} ${className}`
    }, [styles, className])

    return (
        <div className={classes}>
            <input
                className={styles.checkbox}
                id={checkboxId}
                type={"checkbox"}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label className={styles.label} htmlFor={checkboxId}>
                <div className={styles.fake_checkbox}>
                    <IconCheck />
                </div>
                <Text>{label}</Text>
            </label>
        </div>
    )
}

export default Checkbox
