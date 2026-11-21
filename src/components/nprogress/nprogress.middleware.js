import { progress } from "./nprogress.config.js";

const SKIP_ENDPOINTS = new Set(["getUser", "getAllCommentsByRefId"]);
const TRACK_MUTATIONS = new Set(["createUser", "loginUser", "logoutUser"]);

const ACTION_RE = /\/execute(?:Query|Mutation)\/(pending|fulfilled|rejected)$/;

const shouldTrack = (action) => {
  const arg = action.meta?.arg;
  if (!arg?.endpointName) return false;
  if (SKIP_ENDPOINTS.has(arg.endpointName)) return false;
  if (arg.type === "mutation") return TRACK_MUTATIONS.has(arg.endpointName);
  if (arg.forceRefetch) return false; // refetch from tag invalidation, refetch(), refetchOnFocus
  return true;
};

const progressMiddleware = () => (next) => (action) => {
  const match = typeof action.type === "string" && ACTION_RE.exec(action.type);

  if (match && shouldTrack(action)) {
    const id = action.meta.requestId;
    if (match[1] === "pending") progress.start(id);
    else progress.done(id);
  }

  return next(action);
};

export default progressMiddleware;
