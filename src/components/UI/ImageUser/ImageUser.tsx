import React, { useCallback, useMemo } from "react"
import { ReactComponent as IconUser } from "../../../assets/icons/user.svg"
import { IImageUser } from "./IImageUser"
import styles from "./ImageUser.module.scss"

const ImageUser: React.FC<IImageUser> = ({
  className,
  src,
  onClick,
  onDelete,
}) => {
  const classNames = useMemo(() => {
    return `${styles.image_user_wrap} ${className ? className : ""}`
  }, [className, styles])

  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation()

      onDelete()
    },
    [onDelete]
  )

  return (
    <div className={styles.image_user}>
      <div className={classNames} onClick={onClick}>
        <div
          className={styles.image_user}
          style={{
            backgroundImage: `url("${src}")`,
          }}
        />
        <IconUser className={styles.image_icon} />
      </div>
      {!!onDelete && (
        <div className={styles.delete_btn} onClick={handleDelete}>
          <p>X</p>
        </div>
      )}
    </div>
  )
}

export default ImageUser
