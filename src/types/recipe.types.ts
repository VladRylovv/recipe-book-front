import { User } from "./user.types"

export type ApiResponseGetRecipes = RecipeItem[]
export type ApiResponseGetDetailRecipe = RecipeItem[]

export type RecipeItem = {
    id: number
    img: string
    name: string
    description: string
    user: User | null
}
