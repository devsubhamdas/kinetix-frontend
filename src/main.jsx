import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import Layout from "./Layout.jsx";
import { Protected } from "./components/index.js";
import store from "./app/store.js";

// Turns a dynamic import into a React Router `lazy` function.
// Your page files use DEFAULT exports (src/pages/index.js re-exports them
// with `import X from "./..."`), so we read `mod.default`.
const page = (importFn) => async () => {
  const mod = await importFn();
  if (!mod.default) {
    throw new Error("Lazy route: module has no default export");
  }
  return { Component: mod.default };
};

// Same as `page`, but wraps the page in <Protected authentication>.
const protectedPage = (importFn) => async () => {
  const { Component: Page } = await page(importFn)();
  const ProtectedPage = () => (
    <Protected authentication>
      <Page />
    </Protected>
  );
  return { Component: ProtectedPage };
};

// Each page is imported from its own file (not the ./pages barrel),
// so every page becomes a separate chunk.
const pages = {
  home: page(() => import("./pages/home/HomePage")),
  search: page(() => import("./pages/search/SearchPage")),
  channelLayout: page(() => import("./pages/channel/ChannelLayout")),
  channelHome: page(() => import("./pages/channel/pages/ChannelHomePage")),
  channelVideos: page(() => import("./pages/channel/pages/ChannelVideosPage")),
  channelCommunity: page(
    () => import("./pages/channel/pages/ChannelCommunityPage")
  ),
  watch: page(() => import("./pages/watch/WatchPage")),
  post: page(() => import("./pages/post/PostPage")),
  signup: page(() => import("./pages/signup/SignupPage")),
  studioLayout: protectedPage(() => import("./pages/studio/StudioLayout")),
  studioDashboard: page(
    () => import("./pages/studio/pages/StudioDashboardPage")
  ),
  studioContent: page(() => import("./pages/studio/pages/StudioContentPage")),
};

const PageLoader = () => <div className="dark:text-white">Loading...</div>;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} HydrateFallback={PageLoader}>
        <Route index lazy={pages.home} />
        <Route path="results" lazy={pages.search} />
        <Route path="channel/:username" lazy={pages.channelLayout}>
          <Route index lazy={pages.channelHome} />
          <Route path="videos" lazy={pages.channelVideos} />
          <Route path="community" lazy={pages.channelCommunity} />
        </Route>
        <Route path="post/:username/p_id/:id" lazy={pages.post} />
        <Route path="signup" lazy={pages.signup} />
      </Route>

      <Route
        path="/watch/v/:id"
        lazy={pages.watch}
        HydrateFallback={PageLoader}
      />

      <Route
        path="/channel/:username/studio"
        lazy={pages.studioLayout}
        HydrateFallback={PageLoader}
      >
        <Route index lazy={pages.studioDashboard} />
        <Route path="content" lazy={pages.studioContent} />
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

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import Layout from "./Layout.jsx";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Navigate,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
// import {
//   HomePage,
//   ChannelLayout,
//   ChannelHomePage,
//   ChannelVideosPage,
//   ChannelCommunityPage,
//   WatchPage,
//   PostPage,
//   StudioLayout,
//   StudioDashboardPage,
//   StudioContentPage,
//   SignupPage,
//   SearchPage,
// } from "./pages";

// import { Protected } from "./components/index.js";

// import store from "./app/store.js";
// import { Provider } from "react-redux";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<Layout />}>
//         <Route path="" element={<HomePage />} />
//         <Route path="/results" element={<SearchPage />} />
//         <Route path="/channel/:username" element={<ChannelLayout />}>
//           <Route path="/channel/:username" element={<ChannelHomePage />} />
//           <Route
//             path="/channel/:username/videos"
//             element={<ChannelVideosPage />}
//           />
//           <Route
//             path="/channel/:username/community"
//             element={<ChannelCommunityPage />}
//           />
//         </Route>
//         <Route path="/post/:username/p_id/:id" element={<PostPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//       </Route>
//       <Route path="/watch/v/:id" element={<WatchPage />} />
//       <Route
//         path="/channel/:username/studio"
//         element={
//           <Protected authentication>
//             <StudioLayout />
//           </Protected>
//         }
//       >
//         <Route
//           path="/channel/:username/studio"
//           element={<StudioDashboardPage />}
//         />
//         <Route
//           path="/channel/:username/studio/content"
//           element={<StudioContentPage />}
//         />
//       </Route>

//       <Route path="*" element={<Navigate to="/" replace />} />
//     </>
//   )
// );

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </StrictMode>
// );
