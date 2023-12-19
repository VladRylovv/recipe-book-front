import React, { useState } from "react"
import { useCreateRecipeMutation } from "../../store/recipes/recipe.api"
import { useAppSelector } from "../../helpers/hooks/useAppSelector"
import { useNavigate } from "react-router-dom"
import { Button, ImageRecipe, Input, Text } from "../UI"
import classes from "./FormRecipe.module.scss"

const FormRecipe: React.FC = () => {
  const [name, setName] = useState("")
  const [recipeText, setRecipeText] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const navigate = useNavigate()

  const [createRecipe] = useCreateRecipeMutation()

  const userId = useAppSelector((state) => state.auth.user?.id)

  const handleCreateRecipe = () => {
    if (!name || !userId || !image) return

    const data = new FormData()
    data.set("name", name)
    data.set("description", description)
    data.set("authorId", String(userId))
    data.set("image", image)
    data.set("recipeText", recipeText)

    createRecipe(data)
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
    <div className={classes.form_wrap}>
      <Text size={24} type={"bold"}>
        Create recipe
      </Text>
      <div className={classes.form_fields}>
        <ImageRecipe
          className={classes.image_recipe}
          src={image}
          onChangeImage={(image) => setImage(image)}
        />
        <div className={classes.info_recipe}>
          <Input
            placeholder={"Set name recipe"}
            value={name}
            onChange={(value) => setName(value)}
          />
          <Input
            className={classes.description_field}
            placeholder={"Set description recipe"}
            type={"textarea"}
            value={description}
            onChange={(value) => setDescription(value)}
          />
        </div>
      </div>
      <Input
        className={classes.recipe_field}
        placeholder={"Recipe text"}
        type={"textarea"}
        value={recipeText}
        onChange={(value) => setRecipeText(value)}
      />
      <Button
        className={classes.btn_create_recipe}
        label={"Create"}
        onClick={handleCreateRecipe}
      />
    </div>
  )
}

export default FormRecipe
