import React from "react"
import { Text } from "../UI"
import { IInfoBlock } from "./IInfoBlock"
import styles from "./InfoBlock.module.scss"

const InfoBlock: React.FC<IInfoBlock> = ({ title = "Recipes Book" }) => {
  return (
    <div className={styles.block_wrap}>
      <div className={styles.block_text}>
        <Text className={styles.block_text_title} size={36}>
          {title}
        </Text>
        <Text size={16}>
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

export default InfoBlock
