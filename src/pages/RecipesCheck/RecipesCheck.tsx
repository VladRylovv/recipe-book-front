import React from "react"
import { useGetRecipesCheckQuery } from "../../store/recipes/recipe.api"
import { Loader, EmptyState } from "../../components/UI"
import RecipeList from "../../components/RecipeList"
import InfoBlock from "../../components/InfoBlock"

const RecipesCheck: React.FC = () => {
  const { data, isLoading, isFetching } = useGetRecipesCheckQuery()

  if (isLoading || isFetching) return <Loader />

  if (!Array.isArray(data) || !data.length)
    return <EmptyState text={"No recipes"} />

  return (
    <div>
      <InfoBlock title={"Check recipes"} />
      <RecipeList data={data} />
    </div>
  )
}

export default RecipesCheck
