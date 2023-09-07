import { commonApi } from "../api/common.api"
import {
    CREATE_RECIPE,
    GET_DETAIL_RECIPE,
    GET_RECIPES,
    RECIPE,
} from "../../constants/api"
import {
    ApiResponseGetDetailRecipe,
    ApiResponseGetRecipes,
} from "../../types/recipe.types"

const recipeApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query<ApiResponseGetRecipes, void>({
            query: () => ({
                url: `${RECIPE}${GET_RECIPES}`,
            }),
        }),
        getDetailRecipe: builder.query<
            ApiResponseGetDetailRecipe,
            { id: number }
        >({
            query: ({ id }) => ({
                url: `${RECIPE}${GET_DETAIL_RECIPE}/${id}`,
            }),
        }),
        createRecipe: builder.mutation({
            query: ({ name, img, authorId, description }) => ({
                url: `${RECIPE}${CREATE_RECIPE}`,
                method: "POST",
                body: {
                    name,
                    img,
                    authorId,
                    description,
                },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data: createdRecipe } = await queryFulfilled
                    dispatch(
                        commonApi.util.updateQueryData(
                            "getRecipes",
                            undefined,
                            (draft) => {
                                draft.push(createdRecipe)
                            }
                        )
                    )
                } catch {}
            },
        }),
    }),
})

export const {
    useGetRecipesQuery,
    useGetDetailRecipeQuery,
    useCreateRecipeMutation,
} = recipeApi
