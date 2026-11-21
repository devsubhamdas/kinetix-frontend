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
    getSubscribeChannels: builder.query({
      query: ({ accessToken }) => ({
        url: `/subscription/channels`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    getSubscribeChannelsVideos: builder.query({
      query: ({ accessToken, cursor, limit = 10, sortBy = "newest" }) => ({
        url: `/subscription/videos?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}${sortBy ? `&sortBy=${sortBy}` : ""}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      // One cache entry no matter what the cursor is
      serializeQueryArgs: ({ endpointName }) => endpointName,
      // Append new pages (or replace when starting from the beginning)
      merge: (current, incoming, { arg }) => {
        if (!arg?.cursor) return incoming;
        current.data.videos.push(...incoming.data.videos);
        current.data.meta.nextCursor = incoming.data.meta.nextCursor;
        current.data.meta.hasNextPage = incoming.data.meta.hasNextPage;
      },
      // Refetch whenever the cursor changes
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.cursor !== previousArg?.cursor,
    }),
  }),
});

export const {
  useSubscribeChannelMutation,
  useUnsubscribeChannelMutation,
  useGetSubscribeChannelsQuery,
  useGetSubscribeChannelsVideosQuery,
} = subscriptionApi;

export default subscriptionApi;
