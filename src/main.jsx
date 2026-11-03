import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  HomePage,
  ChannelLayout,
  ChannelHomePage,
  ChannelVideosPage,
  ChannelCommunityPage,
  WatchPage,
  PostPage,
  StudioLayout,
  StudioDashboardPage,
  StudioContentPage,
  SignupPage,
} from "./pages";

import { Protected } from "./components/index.js";

import store from "./app/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="/channel/:username" element={<ChannelLayout />}>
          <Route path="/channel/:username" element={<ChannelHomePage />} />
          <Route
            path="/channel/:username/videos"
            element={<ChannelVideosPage />}
          />
          <Route
            path="/channel/:username/community"
            element={<ChannelCommunityPage />}
          />
        </Route>
        <Route path="/post/:username/p_id/:id" element={<PostPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route path="/watch/:username/v_id/:id" element={<WatchPage />} />
      <Route
        path="/channel/:username/studio"
        element={
          <Protected authentication>
            <StudioLayout />
          </Protected>
        }
      >
        <Route
          path="/channel/:username/studio"
          element={<StudioDashboardPage />}
        />
        <Route
          path="/channel/:username/studio/content"
          element={<StudioContentPage />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
