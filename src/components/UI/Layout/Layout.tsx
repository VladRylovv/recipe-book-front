import React, { PropsWithChildren, useMemo } from "react"
import { ILayout } from "./ILayout"
import styles from "./Layout.module.scss"

const Layout: React.FC<PropsWithChildren<ILayout>> = ({
    children,
    className = "",
}) => {
    const classesLayout = useMemo(() => {
        return `${className} ${styles.layout_wrap}`
    }, [styles, className])

    return (
        <div className={classesLayout}>
            <div className={styles.layout}>{children}</div>
        </div>
    )
}

export default Layout
