import React, { useMemo } from "react"
import { ReactComponent as IconUser } from "../../../assets/icons/user.svg"
import { IImageUser } from "./IImageUser"
import styles from "./ImageUser.module.scss"

const ImageUser: React.FC<IImageUser> = ({ className, src, onClick }) => {
  const classNames = useMemo(() => {
    return `${styles.image_user_wrap} ${className ? className : ""}`
  }, [className, styles])

  return (
    <div className={classNames} onClick={onClick}>
      <div
        className={styles.image_user}
        style={{
          backgroundImage: `url("${src}")`,
        }}
      />
      <IconUser className={styles.image_icon} />
    </div>
  )
}

export default ImageUser
