import React, { useMemo, useRef } from "react"
import { isString } from "../../../helpers/isString"
import { _URL } from "../../../constants/api"
import { ReactComponent as IconImages } from "../../../assets/icons/images.svg"
import { IImageRecipe } from "./IImageRecipe"
import classes from "./ImageRecipe.module.scss"

const ImageRecipe: React.FC<IImageRecipe> = ({
  className,
  src,
  onChangeImage,
}) => {
  const refImage = useRef(null)
  const refInputImage = useRef<HTMLInputElement>(null)

  const image = useMemo(() => {
    if (!src) return ""

    return isString(src) ? `${_URL}${src}` : URL.createObjectURL(src)
  }, [src])
  const classesWrap = useMemo(() => {
    return `${classes.image_wrap} ${className} ${
      onChangeImage ? classes.upload_image : ""
    }`
  }, [className, classes])

  const handleClickImage = () => {
    if (!onChangeImage || !refInputImage.current) return

    refInputImage.current.click()
  }
  const handleChangeImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files || !onChangeImage) return

    onChangeImage(e.target.files[0])
  }

  return (
    <div className={classesWrap} onClick={handleClickImage}>
      {onChangeImage && (
        <input
          className={classes.hidden_input_upload_image}
          ref={refInputImage}
          type="file"
          accept=".jpg,.jpeg,.png"
          alt={""}
          onChange={handleChangeImage}
        />
      )}
      <div
        className={classes.image}
        ref={refImage}
        style={{ backgroundImage: `url("${image}")` }}
      />
      <IconImages className={classes.icon_empty_image} />
    </div>
  )
}

export default ImageRecipe
