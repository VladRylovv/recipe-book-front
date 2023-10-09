import React, { useMemo, useRef } from "react"
import { ReactComponent as IconImages } from "../../../assets/icons/images.svg"
import { IImageRecipe } from "./IImageRecipe"
import styles from "./ImageRecipe.module.scss"

const ImageRecipe: React.FC<IImageRecipe> = ({ className, src }) => {
  const refImage = useRef(null)

  const classes = useMemo(() => {
    return `${styles.image_wrap} ${className}`
  }, [className, styles])

  return (
    <div className={classes}>
      <div
        className={styles.image}
        ref={refImage}
        style={{ backgroundImage: `url("${src}")` }}
      />
      <IconImages className={styles.icon_empty_image} />
    </div>
  )
}

export default ImageRecipe
