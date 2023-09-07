import React from "react"
import { Layout, Text } from "../UI"
import styles from "./Footer.module.scss"

const Footer: React.FC = () => {
    return (
        <Layout className={styles.footer_wrap}>
            <Text>Author: Vlad Rylov</Text>
        </Layout>
    )
}

export default Footer
