import { coreApi } from "./core";
import { tags } from "./tags";

const { products, product } = tags;

export const productApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/product",
        method: "GET",
        params,
      }),
      providesTags: [products],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: [product],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [product, products],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: [product, products],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [product, products],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
