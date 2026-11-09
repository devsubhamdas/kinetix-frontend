// src/api/baseQuery.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

let csrfToken = null; // in memory only, shared by every api slice
let inflight = null; // dedupes parallel token fetches

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // needed so the csrf cookie is sent
  prepareHeaders: (headers) => {
    if (csrfToken) headers.set("X-CSRF-Token", csrfToken);
    return headers;
  },
});

const fetchCsrfToken = (api, extra) => {
  inflight ??= Promise.resolve(rawBaseQuery("/csrf-token", api, extra))
    .then((res) => {
      csrfToken = res.data?.csrfToken ?? null;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
};

const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"];

const baseQueryWithCsrf = async (args, api, extra) => {
  const method = (
    typeof args === "string" ? "GET" : (args.method ?? "GET")
  ).toUpperCase();
  const needsToken = !SAFE_METHODS.includes(method);

  if (needsToken && !csrfToken) await fetchCsrfToken(api, extra);

  let result = await rawBaseQuery(args, api, extra);

  // token expired/invalid -> refresh once and retry
  if (needsToken && result.error?.status === 403) {
    csrfToken = null;
    await fetchCsrfToken(api, extra);
    result = await rawBaseQuery(args, api, extra);
  }

  return result;
};

// For requests that bypass fetchBaseQuery (axios, XHR)
export const getCsrfToken = async (api, extra = {}) => {
  if (!csrfToken) await fetchCsrfToken(api, extra);
  return csrfToken;
};

export default baseQueryWithCsrf;
