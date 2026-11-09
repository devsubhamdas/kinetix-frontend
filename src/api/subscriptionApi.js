import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import baseQueryWithCsrf from "./baseQuery";

const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: baseQueryWithCsrf,
  endpoints: (builder) => ({
    subscribeChannel: builder.mutation({
      query: ({ channelName, accessToken }) => ({
        url: `/subscription/add/${channelName}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    unsubscribeChannel: builder.mutation({
      query: ({ channelName, accessToken }) => ({
        url: `/subscription/delete/${channelName}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const { useSubscribeChannelMutation, useUnsubscribeChannelMutation } =
  subscriptionApi;

export default subscriptionApi;
