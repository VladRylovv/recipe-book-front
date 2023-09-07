import React from "react"
import { ImageRecipe, Text } from "../UI"
import { IDetailPageComponent } from "./IDetailPageComponent"
import styles from "./DetailPageComponent.module.scss"

const DetailPageComponent: React.FC<IDetailPageComponent> = ({ recipe }) => {
    return (
        <div className={styles.detail_wrap}>
            <div className={styles.detail_head}>
                <ImageRecipe
                    className={styles.detail_image}
                    src={recipe.img}
                    alt={recipe.name}
                />
                <div className={styles.detail_text}>
                    <div className={styles.detail_title}>
                        <Text type={"bold"} size={24}>
                            {recipe.name}
                        </Text>
                        {recipe.user && (
                            <Text>
                                Author:{" "}
                                <Text component={"span"}>
                                    {recipe.user.name
                                        ? recipe.user.name
                                        : recipe.user.login}
                                </Text>
                            </Text>
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
        </div>
    )
}

export default DetailPageComponent
