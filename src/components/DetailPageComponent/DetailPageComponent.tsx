import React, { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useRemoveRecipeMutation } from "../../store/recipes/recipe.api"
import { useAppSelector } from "../../helpers/hooks/useAppSelector"
import { Button, ImageRecipe, Text } from "../UI"
import { ROLES } from "../../types/user.types"
import { IDetailPageComponent } from "./IDetailPageComponent"
import styles from "./DetailPageComponent.module.scss"

const DetailPageComponent: React.FC<IDetailPageComponent> = ({ recipe }) => {
  const navigate = useNavigate()

  const [removeRecipe] = useRemoveRecipeMutation()
  const user = useAppSelector((state) => state.auth.user)

  const showBtnRemove = useMemo(() => {
    if (!user) return false

    return (
      user.roleId === ROLES.MODERATOR ||
      user.roleId === ROLES.ADMIN ||
      recipe.user?.id === user.id
    )
  }, [user])

  const handleRemove = () => {
    if (!recipe?.id) return

    removeRecipe({ id: recipe.id })
      .unwrap()
      .then(() => navigate("/"))
  }

  return (
    <div className={styles.detail_wrap}>
      <div className={styles.detail_head}>
        <ImageRecipe className={styles.detail_image} src={recipe.img} />
        <div className={styles.detail_text}>
          <div className={styles.detail_title}>
            <Text type={"bold"} size={24}>
              {recipe.name}
            </Text>
            {recipe.user && (
              <Text>
                Author:{" "}
                <Text component={"span"}>
                  {recipe.user.name ? recipe.user.name : recipe.user.login}
                </Text>
              </Text>
            )}
            {showBtnRemove && (
              <Button label={"remove"} size={"s"} onClick={handleRemove} />
            )}
          </div>
          <Text>{recipe.description}</Text>
          <div className={styles.detail_ingredients}>
            <Text size={16} type={"bold"}>
              Ingredients
            </Text>
          </div>
        </div>
      </div>
      {recipe.recipeText && <Text>{recipe.recipeText}</Text>}
    </div>
  )
}

export default DetailPageComponent
