import React, { useMemo } from "react"
import { ILoader } from "./ILoader"
import styles from "./Loader.module.scss"

const Loader: React.FC<ILoader> = ({ size = "m" }) => {
    const classes = useMemo(() => {
        const classSize = styles[`loader_${size}`]

        return `${styles.loader} ${classSize}`
    }, [styles, size])

    return <span className={classes}></span>
}

export default Loader
