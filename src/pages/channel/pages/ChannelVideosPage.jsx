import React, { useEffect } from "react";
import { GridContainer, VideoList } from "../../../components";
import { useGetAllVideosByChannelNameQuery } from "../../../api/videoApi";
import { useParams } from "react-router-dom";

function ChannelVideosPage() {
  const { username: channelName } = useParams();
  const {
    data: videos,
    error,
    isLoading,
  } = useGetAllVideosByChannelNameQuery(channelName);

  useEffect(() => {
    if (error) {
      console.error("ERROR:: ", error);
    }
  }, []);

  return (
    <div className="mt-3 mb-20">
      {/* skeleton loading  */}
      {isLoading && (
        <GridContainer colWidth="14rem">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse bg-gray-100 rounded-xl"
            ></div>
          ))}
        </GridContainer>
      )}
      {/* {error && <div>ERROR:: {error.error}</div>} */}
      {videos && (
        <GridContainer colWidth="14rem">
          <VideoList
            videos={videos.data}
            hideProfile={true}
            hideChannelName={true}
            cardHeight="h-24 sm:h-28 md:h-32 lg:h-36"
            fontSize="text-sm md:text-base"
            cardType="flex justify-between gap-x-1.5 md:block"
            spaceY="space-y-0 lg:space-y-2"
          />
        </GridContainer>
      )}
    </div>
  );
}

export default ChannelVideosPage;
