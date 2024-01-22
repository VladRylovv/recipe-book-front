import React, { useMemo } from "react"
import RecipeItem from "../RecipeItem"
import { IRecipeList } from "./IRecipeList"
import styles from "./RecipeList.module.scss"
import { EmptyState } from "../UI"

const RecipeList: React.FC<IRecipeList> = ({ data }) => {
  const reversedData = useMemo(() => {
    if (!data) return []

    return [...data].reverse()
  }, [data])

  if (!Array.isArray(data) || !data.length)
    return <EmptyState text={"No recipes"} />

  return (
    <ul className={styles.recipe_list_wrap}>
      {reversedData.map((item) => {
        return <RecipeItem key={item.id} {...item} />
      })}
    </ul>
  )
}

export default RecipeList
