import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import baseQueryWithCsrf from "./baseQuery";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithCsrf,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (formData) => ({
        url: "/user/register",
        method: "POST",
        body: formData,
      }),
    }),
    loginUser: builder.mutation({
      query: (formData) => ({
        url: "/user/login",
        method: "POST",
        credentials: "include",
        body: formData,
      }),
    }),
    logoutUser: builder.mutation({
      query: (accessToken) => ({
        url: "/user/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
      }),
    }),
    refreshAccessToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/user/renew/access-token",
        method: "POST",
        credentials: "include",
        body: { refreshToken },
      }),
    }),
    validateAccessToken: builder.mutation({
      query: (accessToken) => ({
        url: "/user/validate/access-token",
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
      }),
    }),
    getChannelInfoAndStats: builder.query({
      query: ({ channelName, accessToken }) => ({
        url: `/channel/${channelName}`,
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
      }),
    }),
    getUser: builder.query({
      query: (accessToken) => ({
        url: "/user/current-user",
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
      }),
    }),
  }),
});

export const {
  useGetChannelInfoAndStatsQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRefreshAccessTokenMutation,
  useValidateAccessTokenMutation,
  useGetUserQuery,
} = userApi;

export default userApi;
