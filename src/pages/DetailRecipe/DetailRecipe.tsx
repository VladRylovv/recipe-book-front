import React, { useMemo } from "react"
import { useGetDetailRecipeQuery } from "../../store/recipes/recipe.api"
import { useParams } from "react-router-dom"
import { ScrollRestoration } from "react-router-dom"
import DetailPageComponent from "../../components/DetailPageComponent"
import LoaderPage from "../../components/LoaderPage/LoaderPage"

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

  if (isLoading || isFetching) return <LoaderPage />
  if (!recipe) throw new Response("Not found", { status: 404 })

  return (
    <div>
      <DetailPageComponent recipe={recipe} />
      <ScrollRestoration />
    </div>
  )
}

export default DetailRecipe
