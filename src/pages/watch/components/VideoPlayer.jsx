import React, { useEffect, useMemo, useRef } from "react";
import { IKVideoPlayer } from "@imagekit/video-player/react";
import { videoPlayer } from "@imagekit/video-player";
import "@imagekit/video-player/styles.css";
import { useIncrementVideoViewsCountMutation } from "../../../api/videoApi";

const VIEW_THRESHOLD_SECONDS = 3;

function VideoPlayer({ video }) {
  const playpackUrl = video?.data?.videoFile;
  const videoId = video?.data?.encId;
  const [incrementViews] = useIncrementVideoViewsCountMutation();

  const watchedRef = useRef(0); // seconds actually played
  const lastTimeRef = useRef(null); // previous currentTime sample
  const countedRef = useRef(false); // already counted for this video?

  const handleTimeUpdate = (e) => {
    if (countedRef.current) return;

    const current = e.currentTarget.currentTime;

    if (lastTimeRef.current !== null) {
      const delta = current - lastTimeRef.current;
      // timeupdate fires ~every 250ms during normal playback;
      // larger jumps are seeks, so ignore them
      if (delta > 0 && delta < 1) watchedRef.current += delta;
    }
    lastTimeRef.current = current;

    if (watchedRef.current >= VIEW_THRESHOLD_SECONDS) {
      countedRef.current = true;
      incrementViews({ id: videoId })
        .unwrap()
        .catch((err) => console.error("IncrementViewError::", err));
    }
  };

  // break the delta chain so pauses/seeks/buffering don't add time
  const resetLastTime = () => {
    lastTimeRef.current = null;
  };

  return (
    <>
      <div className="aspect-video mb-2 bg-black md:rounded-xl md:overflow-hidden md:ml-3 lg:ml-0">
        <video
          src={playpackUrl}
          controls
          controlsList="nodownload"
          autoPlay
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onSeeking={resetLastTime}
          onPause={resetLastTime}
          onWaiting={resetLastTime}
        />
      </div>
    </>
  );
}

// function ImageKitVideoPlayer({ video }) {
//   // 1. Guard early before creating options
//   const videoSrc = video?.data?.videoFile;
//   const thumbnailSrc =
//     video?.data?.thumbnail ||
//     "https://res.cloudinary.com/dlnzjejsr/video/upload/so_0/v1793345773/qmu9b072wdw7mxfasjii.jpg";

//   // 2. Memoize configurations so they don't trigger re-initialisation loops
//   const ikOptions = useMemo(
//     () => ({
//       imagekitId: import.meta.env.VITE_IMAGEKIT_ID,
//       seekThumbnails: false,
//     }),
//     []
//   );

//   const source = useMemo(() => {
//     if (!videoSrc) return null;
//     return {
//       src: videoSrc,
//       poster: { src: thumbnailSrc || "" },
//     };
//   }, [videoSrc, thumbnailSrc]);

//   // 3. Prevent rendering the SDK component entirely until data is ready
//   if (!videoSrc || !source) {
//     return <div className="aspect-video bg-black md:rounded-xl" />;
//   }

//   return <IKVideoPlayer key={videoSrc} ikOptions={ikOptions} source={source} />;
// }

export default function ImageKitVideoPlayer({ video }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  const url = video?.data?.videoFile;
  const posterUrl = video?.data?.thumbnails || "";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const el = document.createElement("video");
    el.className = "video-js";
    container.appendChild(el); // attached to the DOM before init

    const player = videoPlayer(
      el,
      { imagekitId: import.meta.env.VITE_IMAGEKIT_ID, seekThumbnails: false },
      { controls: true, fluid: true }
    );
    player.src({ src: url, poster: { src: posterUrl } });
    playerRef.current = player;

    return () => {
      playerRef.current?.dispose();
      playerRef.current = null;
      container.innerHTML = "";
    };
  }, [url, posterUrl]);

  return (
    <div
      ref={containerRef}
      className="mb-2 bg-black md:rounded-xl md:overflow-hidden md:ml-3 lg:ml-0"
    />
  );
}

export { VideoPlayer, ImageKitVideoPlayer };
