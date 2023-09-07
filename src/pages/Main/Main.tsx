import React from "react"
import { useSetTitle } from "../../helpers/hooks/useSetTitle"
import { useGetRecipesQuery } from "../../store/recipes/recipe.api"
import RecipeList from "../../components/RecipeList"
import Block from "../../components/Block"

const Main: React.FC = () => {
    useSetTitle("Main")

    const { data } = useGetRecipesQuery()

    if (!Array.isArray(data)) return null

    return (
        <div>
            <Block />
            <RecipeList data={data} />
        </div>
    )
}

export default Main
