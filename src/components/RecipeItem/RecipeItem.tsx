import React from "react"
import { useNavigate } from "react-router-dom"
import { Button, ImageRecipe, Text } from "../UI"
import { getDate } from "../../helpers/date"
import { IRecipeItem } from "./IRecipeItem"
import styles from "./RecipeItem.module.scss"

const RecipeItem: React.FC<IRecipeItem> = ({
    id,
    name,
    img,
    description,
    user,
    createdAt,
}) => {
    const navigate = useNavigate()

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
        </li>
    )
}

export default RecipeItem
