import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 150, minimum: 0.1 });

const START_DELAY = 120; // don't show the bar for very fast work
const DONE_GRACE = 150;  // wait briefly before finishing (see below)

const active = new Set();
let startTimer = null;
let doneTimer = null;

export const progress = {
  start(id) {
    active.add(id);
    clearTimeout(doneTimer);
    if (!NProgress.isStarted() && !startTimer) {
      startTimer = setTimeout(() => {
        startTimer = null;
        if (active.size > 0) NProgress.start();
      }, START_DELAY);
    }
  },

  done(id) {
    active.delete(id);
    if (active.size > 0) return;

    // nothing left: cancel a bar that hasn't shown yet
    clearTimeout(startTimer);
    startTimer = null;

    if (!NProgress.isStarted()) return;

    clearTimeout(doneTimer);
    doneTimer = setTimeout(() => {
      if (active.size === 0) NProgress.done();
    }, DONE_GRACE);
  },
};