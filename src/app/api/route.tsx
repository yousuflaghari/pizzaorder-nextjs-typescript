import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
}

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/recipes/" }),
  endpoints: (builder) => ({
    searchRecipes: builder.query<RecipesResponse, void>({
      query: () => `search`,
    }),
  }),
});

export const { useSearchRecipesQuery } = apiSlice;
export default apiSlice;
