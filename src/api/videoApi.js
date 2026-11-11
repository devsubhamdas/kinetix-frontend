import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { setUploadProgress } from "../features/global/globalSlice";
import { BASE_URL } from "../constants";
import baseQueryWithCsrf, { getCsrfToken } from "./baseQuery";

const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: baseQueryWithCsrf,
  endpoints: (builder) => ({
    getVideosByRecommendation: builder.query({
      query: ({ cursor, limit = 20 } = {}) =>
        `/recommend/videos?limit=${limit}&cursor=${cursor ?? ""}`,
      // One cache entry no matter what the cursor is
      serializeQueryArgs: ({ endpointName }) => endpointName,
      // Append new pages (or replace when starting from the beginning)
      merge: (currentCache, newData, { arg }) => {
        if (!arg?.cursor) return newData;
        currentCache.data.videos.push(...newData.data.videos);
        currentCache.data.nextCursor = newData.data.nextCursor;
        currentCache.data.hasNextPage = newData.data.hasNextPage;
      },
      // Refetch whenever the cursor changes
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.cursor !== previousArg?.cursor,
    }),
    getVideoById: builder.query({
      query: ({ id, accessToken }) => ({
        url: `/videos/${id}`,
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
      }),
    }),
    getVideosByChannelName: builder.query({
      query: ({ channelName, cursor, limit = 20 } = {}) =>
        `/channel/${channelName}/videos?limit=${limit}&cursor=${cursor ?? ""}`,
      // One cache entry no matter what the cursor is
      serializeQueryArgs: ({ endpointName }) => endpointName,
      // Append new pages (or replace when starting from the beginning)
      merge: (currentCache, newData, { arg }) => {
        if (!arg?.cursor) return newData;
        currentCache.data.videos.push(...newData.data.videos);
        currentCache.data.nextCursor = newData.data.nextCursor;
        currentCache.data.hasNextPage = newData.data.hasNextPage;
      },
      // Refetch whenever the cursor changes or channel name changes
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.cursor !== previousArg?.cursor ||
        currentArg?.channelName !== previousArg?.channelName,
    }),
    getVidoesBySearchTerm: builder.query({
      query: ({ term, cursor, limit = 10 } = {}) =>
        `${BASE_URL}/search/videos?q=${term}&limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (current, incoming, { arg }) => {
        if (!arg?.cursor) return incoming;
        current.data.videos.push(...incoming.data.videos);
        current.data.meta.nextCursor = incoming.data.meta.nextCursor;
        current.data.meta.hasNextPage = incoming.data.meta.hasNextPage;
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.cursor !== previousArg?.cursor,
      keepUnusedDataFor: 0,
    }),
    uploadVideo: builder.mutation({
      queryFn: async ({ username, data, accessToken }, api) => {
        const url = `${BASE_URL}/channel/${username}/video/upload`;
        const csrfToken = await getCsrfToken(api);

        const config = {
          withCredentials: true, // required for csrf cookie
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-CSRF-Token": csrfToken,
          },
          onUploadProgress: (upload) => {
            let uploadProgress = Math.round(
              (upload.loaded / upload.total) * 100
            );
            api.dispatch(setUploadProgress(uploadProgress));
          },
        };

        try {
          const result = await axios.post(url, data, config);
          return { data: result.data };
        } catch (error) {
          return {
            error: {
              status: error.response?.status || 500,
              data: error.response?.data || error.message,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useGetVideosByRecommendationQuery,
  useGetVideoByIdQuery,
  useGetVideosByChannelNameQuery,
  useGetVidoesBySearchTermQuery,
  useUploadVideoMutation,
} = videoApi;

export default videoApi;
