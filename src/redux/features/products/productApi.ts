import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllProducts: builder.query({
      query: (args) => ({
        url: "/products",
        method: "GET",
        params: args,
      }),
      transformResponse: (response: any) => ({
        data: response.data,
      }),
      providesTags: ["products"],
    }),
    GetSingleProducts: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => ({
        data: response.data,
      }),
      providesTags: ["products"],
    }),
    AddNewProduct: builder.mutation({
      query: (payload) => ({
        url: "/products/create-product",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["products"],
    }),
    EditProduct: builder.mutation({
      query: (payload) => ({
        url: `/products/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["products"],
    }),
    DeleteAllProducts: builder.mutation({
      query: (payload) => ({
        url: `/products/bulk-delete`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["products"],
    }),
    DeleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddNewProductMutation,
  useGetSingleProductsQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useDeleteAllProductsMutation,
} = productApi;
