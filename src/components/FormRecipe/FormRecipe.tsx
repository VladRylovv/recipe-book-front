import React, { useState } from "react"
import { useCreateRecipeMutation } from "../../store/recipes/recipe.api"
import { useAppSelector } from "../../helpers/hooks/useAppSelector"
import { useNavigate } from "react-router-dom"
import { Button, Input, Text } from "../UI"
import styles from "./FormRecipe.module.scss"

const FormRecipe: React.FC = () => {
  const [name, setName] = useState("")
  const [img, setImg] = useState("")
  const [description, setDescription] = useState("")

  const navigate = useNavigate()

  const [createRecipe] = useCreateRecipeMutation()

  const userId = useAppSelector((state) => state.auth.user?.id)

  const handleCreateRecipe = () => {
    if (!name || !img) return

    createRecipe({ name, img, authorId: userId, description })
      .unwrap()
      .then(() => {
        navigate("/")
      })
      .catch((err) => {
        console.error(err)
      })
  }

  if (!userId) return null

  return (
    <div className={styles.form_wrap}>
      <Text size={24} type={"bold"}>
        Create recipe
      </Text>
      <div className={styles.form_fields}>
        <Input
          placeholder={"Set name recipe"}
          value={name}
          onChange={(value) => setName(value)}
        />
        <Input
          placeholder={"Set image recipe"}
          value={img}
          onChange={(value) => setImg(value)}
        />
      </div>
      <Input
        placeholder={"Set description recipe"}
        type={"textarea"}
        value={description}
        onChange={(value) => setDescription(value)}
      />
      <Button label={"Create"} onClick={handleCreateRecipe} />
    </div>
  )
}

export default FormRecipe
