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
    GetAllSales: builder.query({
      query: (args) => ({
        url: `/sales`,
        params: args,
      }),
      transformResponse: (response: any) => ({
        data: response.data,
      }),
      providesTags: ["allSales"],
    }),
    CreateSale: builder.mutation({
      query: (payload) => ({
        url: "/sales",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["products", "sales", "allSales"],
    }),
  }),
});

export const {
  useGetSalesHistoryQuery,
  useCreateSaleMutation,
  useGetAllSalesQuery,
} = saleApi;
