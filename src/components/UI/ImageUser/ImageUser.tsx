import React from "react"
import { ReactComponent as IconUser } from "../../../assets/icons/user.svg"
import { IImageUser } from "./IImageUser"
import styles from "./ImageUser.module.scss"

const ImageUser: React.FC<IImageUser> = () => {
    return (
        <div className={styles.image_user_wrap}>
            <div className={styles.image_user} />
            <IconUser className={styles.image_icon} />
        </div>
    )
}

export default ImageUser
