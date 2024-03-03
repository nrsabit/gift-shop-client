import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gift-shop-server-six.vercel.app/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.append("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["products", "sales"],
  endpoints: () => ({}),
});
