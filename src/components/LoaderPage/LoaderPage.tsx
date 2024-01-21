import React from "react"
import { Loader } from "../UI"
import styles from "./LoaderPage.module.scss"

const LoaderPage: React.FC = () => {
  return (
    <div className={styles.loader_page_wrap}>
      <Loader size={"l"} />
    </div>
  )
}

export default LoaderPage
