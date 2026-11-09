import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import baseQueryWithCsrf from "./baseQuery";

const impressionApi = createApi({
  reducerPath: "impressionApi",
  baseQuery: baseQueryWithCsrf,
  endpoints: (builder) => ({
    addLike: builder.mutation({
      query: ({ refType, refId, accessToken }) => ({
        url: `/impression/add/like/${refType}/${refId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
      }),
    }),
    addDislike: builder.mutation({
      query: ({ refType, refId, accessToken }) => ({
        url: `/impression/add/dislike/${refType}/${refId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
      }),
    }),
    deleteLike: builder.mutation({
      query: ({ refType, refId, accessToken }) => ({
        url: `/impression/delete/like/${refType}/${refId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
      }),
    }),
    deleteDislike: builder.mutation({
      query: ({ refType, refId, accessToken }) => ({
        url: `/impression/delete/dislike/${refType}/${refId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
      }),
    }),
  }),
});

export const {
  useAddLikeMutation,
  useAddDislikeMutation,
  useDeleteLikeMutation,
  useDeleteDislikeMutation,
} = impressionApi;

export default impressionApi;
