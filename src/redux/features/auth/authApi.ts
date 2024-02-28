import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInfo,
      }),
    }),
    register: builder.mutation({
      query: (userDetails) => ({
        url: "/auth/register",
        method: "POST",
        body: userDetails,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
