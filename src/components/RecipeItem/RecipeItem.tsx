import React, { useEffect } from "react"
import { useCheckRecipeMutation } from "../../store/recipes/recipe.api"
import { useNavigate } from "react-router-dom"
import { Button, ImageRecipe, Text } from "../UI"
import { getDate } from "../../helpers/date"
import { IRecipeItem } from "./IRecipeItem"
import styles from "./RecipeItem.module.scss"
import { ROLES } from "../../types/user.types"
import { useAppSelector } from "../../helpers/hooks/useAppSelector"

const RecipeItem: React.FC<IRecipeItem> = ({
  id,
  name,
  img,
  description,
  user,
  createdAt,
  isChecked,
}) => {
  const navigate = useNavigate()

  const [checkRecipe] = useCheckRecipeMutation()
  const userLoginned = useAppSelector((state) => state.auth.user)

  const handleCheckRecipe = () => {
    checkRecipe({ id })
  }

  useEffect(() => {
    if (userLoginned?.roleId !== ROLES.ADMIN) navigate("/")
  }, [userLoginned])

  return (
    <li className={styles.recipe_wrap}>
      <ImageRecipe src={img} alt={name} />
      <div className={styles.recipe_text_wrap}>
        <div className={styles.recipe_item_top}>
          <Text type={"bold"}>{name}</Text>
          <Text color={"secondary"}>{getDate(createdAt)}</Text>
        </div>
        {user && (
          <Text>
            Author:{" "}
            <Text
              component={"span"}
              onClick={() => navigate(`/profile/${user!.id}`)}
            >
              {user.name ? user.name : user.login}
            </Text>
          </Text>
        )}
        <Text>{description}</Text>
      </div>
      <Button
        className={styles.recipe_button}
        label={"Подробнее"}
        onClick={() => navigate(`/${id}`)}
      />
      {!isChecked && userLoginned?.roleId === ROLES.ADMIN && (
        <Button
          className={styles.recipe_button}
          label={"Одобрить"}
          onClick={handleCheckRecipe}
        />
      )}
    </li>
  )
}

export default RecipeItem
