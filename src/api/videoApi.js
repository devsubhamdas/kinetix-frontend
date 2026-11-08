import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { setUploadProgress } from "../features/global/globalSlice";
import { BASE_URL } from "../constants";

const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
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
    uploadVideo: builder.mutation({
      queryFn: async ({ username, data, accessToken }, api) => {
        const url =
          import.meta.env.VITE_NODE_ENV === "prod"
            ? `${
                import.meta.env.VITE_NODE_SERVER_HOSTNAME
              }/api/v1/channel/${username}/video/upload`
            : `${import.meta.env.VITE_NODE_SERVER_LOCAL_HOSTNAME}:${
                import.meta.env.VITE_NODE_SERVER_PORT
              }/api/v1/channel/${username}/video/upload`;

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
  useUploadVideoMutation,
} = videoApi;

export default videoApi;
