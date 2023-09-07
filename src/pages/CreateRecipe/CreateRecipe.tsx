import React from "react"
import FormRecipe from "../../components/FormRecipe"
import { useSetTitle } from "../../helpers/hooks/useSetTitle"

const CreateRecipe: React.FC = () => {
    useSetTitle("Create recipe")

    return <FormRecipe />
}

export default CreateRecipe
