import React, { useMemo } from "react"
import { useGetDetailRecipeQuery } from "../../store/recipes/recipe.api"
import { useParams } from "react-router-dom"
// import { useSetTitle } from "../../helpers/hooks/useSetTitle"
import { ScrollRestoration } from "react-router-dom"
import { Loader } from "../../components/UI"
import DetailPageComponent from "../../components/DetailPageComponent"

const DetailRecipe: React.FC = () => {
  const { recipeId } = useParams()

  const { data, isLoading, isFetching } = useGetDetailRecipeQuery(
    { id: +recipeId! },
    {
      skip: !recipeId,
    }
  )

  const recipe = useMemo(() => {
    if (!data) return null

    return data
  }, [data])

  // useSetTitle(recipe ? recipe.name : "Recipe", [recipe])

  if (isLoading || isFetching)
    return (
      <div>
        <Loader size={"l"} />
      </div>
    )
  if (!recipe) throw new Response("Not found", { status: 404 })

  return (
    <div>
      <DetailPageComponent recipe={recipe} />
      <ScrollRestoration />
    </div>
  )
}

export default DetailRecipe
