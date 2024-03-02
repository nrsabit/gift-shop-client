import { baseApi } from "../../api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetSalesHistory: builder.query({
      query: (period) => ({
        url: `/sales/${period}`,
        method: "GET",
      }),
      transformResponse: (response: any) => ({
        data: response.data,
      }),
      providesTags: ["sales"],
    }),
    CreateSale: builder.mutation({
      query: (payload) => ({
        url: "/sales",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["products", "sales"],
    }),
  }),
});

export const { useGetSalesHistoryQuery, useCreateSaleMutation } = saleApi;
