import { commonApi } from "../api/common.api"
import {
  CHECK_RECIPE,
  CREATE_RECIPE,
  GET_DETAIL_RECIPE,
  GET_RECIPES,
  GET_RECIPES_CHECK,
  RECIPE,
} from "../../constants/api"
import {
  ApiResponseCheckRecipe,
  ApiResponseCreateRecipe,
  ApiResponseGetDetailRecipe,
  ApiResponseGetRecipes,
} from "../../types/recipe.types"

const recipeApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<ApiResponseGetRecipes, { searchText: string }>({
      query: ({ searchText = "" }) => ({
        url: `${RECIPE}${GET_RECIPES}`,
        params: {
          searchText,
        },
      }),
    }),
    getRecipesCheck: builder.query<ApiResponseGetRecipes, void>({
      query: () => ({
        url: `${RECIPE}${GET_RECIPES_CHECK}`,
      }),
    }),
    checkRecipe: builder.mutation<ApiResponseCheckRecipe, { id: number }>({
      query: ({ id }) => ({
        url: `${RECIPE}${CHECK_RECIPE}/${id}`,
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        const { recipeId, recipe } = data

        try {
          dispatch(
            recipeApi.util.updateQueryData(
              "getRecipesCheck",
              undefined,
              (recipes) => {
                return recipes.filter((recipe) => +recipe.id !== +recipeId)
              }
            )
          )
          dispatch(
            recipeApi.util.updateQueryData(
              "getRecipes",
              { searchText: "" },
              (recipes) => {
                return [...recipes, recipe]
              }
            )
          )
        } catch (err) {
          console.error(err)
        }
      },
    }),
    getDetailRecipe: builder.query<ApiResponseGetDetailRecipe, { id: number }>({
      query: ({ id }) => ({
        url: `${RECIPE}${GET_DETAIL_RECIPE}/${id}`,
      }),
    }),
    createRecipe: builder.mutation<ApiResponseCreateRecipe, FormData>({
      query: (form) => ({
        url: `${RECIPE}${CREATE_RECIPE}`,
        method: "POST",
        body: form,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: createdRecipe } = await queryFulfilled
          dispatch(
            recipeApi.util.updateQueryData(
              "getRecipesCheck",
              undefined,
              (draft) => {
                draft.push(createdRecipe)
              }
            )
          )
        } catch (err) {
          console.error(err)
        }
      },
    }),
  }),
})

export const {
  useGetRecipesQuery,
  useGetRecipesCheckQuery,
  useGetDetailRecipeQuery,
  useCreateRecipeMutation,
  useCheckRecipeMutation,
} = recipeApi
