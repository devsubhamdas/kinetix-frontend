import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetVideosByChannelNameQuery } from "../../../api/videoApi";
import { VideoList } from "../../../components";

function ChannelHomePage() {
  const { username: channelName } = useParams();
  const { data, error, isLoading } = useGetVideosByChannelNameQuery({
    channelName,
    limit: 3,
    sortBy: "popular",
  });

  useEffect(() => {
    if (error) {
      console.error("ERROR:: ", error);
    }
  }, [error]);

  return (
    <>
      <div className="max-w-2xl mb-20">
        <div className="mx-2 md:mx-4 my-2">
          <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-sm md:text-base lg:text-lg">
            Popular Videos
          </span>
        </div>
        <VideoList
          videos={data?.data.videos}
          hideProfile={true}
          hideChannelName={true}
          cardHeight="h-32 sm:h-44 md:h-48 lg:h-52 aspect-video"
          fontSize="text-sm md:text-base"
          cardType="flex justify-between gap-x-1.5"
          spaceY="space-y-0 lg:space-y-2"
        />
      </div>
    </>
  );
}

export default ChannelHomePage;
