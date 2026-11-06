import React from "react";
import { VideoCard } from "../index.js";

function VideoList({ videos, ...props }) {
  if (videos?.length === 0) {
    return (
      <>
        <div className="w-max">No videos found</div>
      </>
    );
  }

  return (
    <>
      {videos?.map((video) => (
        <VideoCard
          key={video?._id}
          id={video?._id}
          thumbnail={video?.thumbnail || ""}
          profile={video?.owner?.avatar || ""}
          title={video.title}
          channelname={video?.owner?.username}
          views={video?.views}
          duration={video.duration}
          createdAt={video?.createdAt}
          {...props}
        />
      ))}
    </>
  );
}

export default VideoList;
