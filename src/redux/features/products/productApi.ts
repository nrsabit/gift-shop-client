import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAllProducts: builder.query({
      query: () => ({
        url: "/products",
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
  }),
});

export const { useGetAllProductsQuery, useAddNewProductMutation } = productApi;
