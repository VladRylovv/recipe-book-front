import React, { useMemo } from "react"
import { useSetTitle } from "../../helpers/hooks/useSetTitle"
import { useGetRecipesQuery } from "../../store/recipes/recipe.api"
import RecipeList from "../../components/RecipeList"
import InfoBlock from "../../components/InfoBlock"
import { EmptyState, Loader } from "../../components/UI"

const Main: React.FC = () => {
  useSetTitle("Main")

  const { data, isFetching, isLoading } = useGetRecipesQuery()

  const loading = useMemo(() => {
    return !!(isFetching || isFetching)
  }, [isLoading, isFetching])

  if (!Array.isArray(data) || !data.length)
    return <EmptyState text={"No recipes"} />

  return (
    <div>
      <InfoBlock />
      {loading ? <Loader /> : <RecipeList data={data} />}
    </div>
  )
}

export default Main
