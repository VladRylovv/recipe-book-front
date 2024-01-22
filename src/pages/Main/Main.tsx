import React, { useMemo, useState } from "react"
import { useSetTitle } from "../../helpers/hooks/useSetTitle"
import { useGetRecipesQuery } from "../../store/recipes/recipe.api"
import RecipeList from "../../components/RecipeList"
import InfoBlock from "../../components/InfoBlock"
import LoaderPage from "../../components/LoaderPage/LoaderPage"
import SearchInput from "../../components/SearchInput/SearchInput"
import { EmptyState } from "../../components/UI"

const Main: React.FC = () => {
  const [searchValue, setSearchValue] = useState("")

  useSetTitle("Main")

  const { data, isFetching, isLoading } = useGetRecipesQuery({
    searchText: searchValue,
  })

  const loading = useMemo(() => {
    return !!(isFetching || isFetching)
  }, [isLoading, isFetching])

  if (loading) return <LoaderPage />

  return (
    <div>
      <InfoBlock />
      <SearchInput
        searchValue={searchValue}
        onChangeSearchValue={(value) => setSearchValue(value)}
      />
      <RecipeList data={data} />
    </div>
  )
}

export default Main
