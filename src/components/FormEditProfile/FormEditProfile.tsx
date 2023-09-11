import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  useDeleteAvatarMutation,
  useEditUserMutation,
} from "../../store/user/user.api"
import { useAppDispatch } from "../../helpers/hooks/useAppDispatch"
import { useNavigate } from "react-router-dom"
import { Button, ImageUser, Input } from "../UI"
import { addNotification } from "../../helpers/addNotification"
import { editProfileManual } from "../../store/user/actions/editProfileManual"
import { formatDataEditProfile } from "./helpers/formatDataEditProfile"
import { _URL } from "../../constants/api"
import { IFormEditProfile } from "./IFormEditProfile"
import styles from "./FormEditProfile.module.scss"

const FormEditProfile: React.FC<IFormEditProfile> = ({ user }) => {
  const [image, setImage] = useState<File | string>(user.avatar)
  const [login, setLogin] = useState(user.login)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const navigate = useNavigate()

  const refInputFile = useRef(null)

  const [editProfile] = useEditUserMutation()
  const [deleteAvatar] = useDeleteAvatarMutation()
  const dispatch = useAppDispatch()

  const imageValue = useMemo(() => {
    if (image instanceof File) {
      return URL.createObjectURL(image)
    }
    if (image) {
      return `${_URL}${image}`
    }

    return ""
  }, [image])

  //region HANDLERS
  const handleEdit = useCallback(() => {
    if (!user?.id) return

    const formatData = formatDataEditProfile({
      id: user.id,
      login,
      name,
      email,
      image,
    })

    editProfile(formatData)
      .unwrap()
      .then((res) => {
        editProfileManual(dispatch, res)
        navigate(`/profile/${res.id}`)
      })
      .catch((err) => {
        console.error(err)

        addNotification("error", err.data.message)
      })
  }, [login, image, name, email, user?.id])
  const handleOpenFileSelect = useCallback(() => {
    if (!refInputFile.current) return

    refInputFile.current.click()
  }, [refInputFile.current])
  const handleUploadFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files[0]) setImage(e.target?.files[0])
  }, [])
  const handleDeleteAvatar = useCallback(() => {
    if (!user?.id) return

    setImage("")

    if (!user.avatar) return

    deleteAvatar(user.id)
      .unwrap()
      .then((res) => {
        editProfileManual(dispatch, res)
      })
      .catch((err) => console.error(err))
  }, [imageValue, user.id, user.avatar])
  //endregion

  return (
    <div>
      <div className={styles.form_edit_profile_wrap}>
        <ImageUser
          className={styles.avatar_field}
          src={imageValue}
          onClick={handleOpenFileSelect}
          onDelete={imageValue ? handleDeleteAvatar : null}
        />
        <div className={styles.form_fields}>
          <input
            ref={refInputFile}
            className={styles.input_file_upload}
            type={"file"}
            onChange={handleUploadFile}
          />
          <Input
            placeholder={"Login"}
            value={login}
            onChange={(value) => setLogin(value)}
          />
          <Input
            placeholder={"Name"}
            value={name}
            onChange={(value) => setName(value)}
          />
          <Input
            placeholder={"Email"}
            value={email}
            onChange={(value) => setEmail(value)}
          />
        </div>
      </div>
      <Button label={"Edit"} onClick={handleEdit} />
    </div>
  )
}

export default FormEditProfile
