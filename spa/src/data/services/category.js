import { coreApi } from "./core";
import { tags } from "./tags";

const { categories, category } = tags;

export const categoryApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (params) => ({
        url: "category",
        method: "GET",
        params,
      }),
      providesTags: [categories],
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `category/${id}`,
        method: "GET",
      }),
      providesTags: [category],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [category, categories],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `category/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: [category, categories],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [categories, category],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useLazyGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
