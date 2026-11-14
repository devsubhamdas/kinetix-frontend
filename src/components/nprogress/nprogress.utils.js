import { progress } from "./nprogress.config.js";

export function attachNProgress(router) {
  return router.subscribe((state) => {
    if (state.navigation.state === "loading") progress.start("route");
    else progress.done("route");
  });
}
