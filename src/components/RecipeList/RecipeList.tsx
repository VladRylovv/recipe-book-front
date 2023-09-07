import React, { useMemo } from "react"
import RecipeItem from "../RecipeItem"
import { IRecipeList } from "./IRecipeList"
import styles from "./RecipeList.module.scss"

const RecipeList: React.FC<IRecipeList> = ({ data }) => {
    const reversedData = useMemo(() => {
        if (!data) return []

        return [...data].reverse()
    }, [data])

    return (
        <ul className={styles.recipe_list_wrap}>
            {reversedData.map((item) => {
                return <RecipeItem key={item.id} {...item} />
            })}
        </ul>
    )
}

export default RecipeList
