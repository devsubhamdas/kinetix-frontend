import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetVideosByChannelNameQuery } from "../../../api/videoApi";
import { VideoList } from "../../../components";

function ChannelHomePage() {
  const { username: channelName } = useParams();
  const [cursor, setCursor] = useState();
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
      <div className="max-w-2xl mb-12">
        <div className="mx-4 my-2">
          <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-sm lg:text-lg">
            Popular Videos
          </span>
        </div>
        <VideoList
          videos={data?.data.videos}
          hideProfile={true}
          hideChannelName={true}
          cardHeight="h-24 sm:h-28 md:h-40 lg:h-52 aspect-video"
          fontSize="text-sm md:text-base"
          cardType="flex justify-between gap-x-1.5"
          spaceY="space-y-0 lg:space-y-2"
        />
      </div>
    </>
  );
}

export default ChannelHomePage;
