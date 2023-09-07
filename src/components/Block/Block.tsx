import React from "react"
import { Text } from "../UI"
import styles from "./Block.module.scss"

const Block: React.FC = () => {
    return (
        <div className={styles.block_wrap}>
            <div className={styles.block_text}>
                <Text className={styles.block_text_title} size={36}>
                    Recipes Book
                </Text>
                <Text size={18}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                    <br />
                    ab assumenda blanditiis culpa cupiditate debitis dolor ex
                    <br />
                    illo in labore necessitatibus.
                </Text>
            </div>
            <div className={styles.image_block} />
        </div>
    )
}

export default Block
