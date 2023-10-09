import React from "react"
import { Text } from "../index"
import { IEmptyState } from "./IEmptyState"
import styles from "./EmptyState.module.scss"

const EmptyState: React.FC<IEmptyState> = ({ text = "No data" }) => {
  return (
    <div className={styles.empty_state_wrap}>
      <Text type={"bold"} size={24}>
        {text}
      </Text>
    </div>
  )
}

export default EmptyState
