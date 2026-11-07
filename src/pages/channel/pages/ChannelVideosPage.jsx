import React, { useEffect, useState, useRef, useCallback } from "react";
import { GridContainer, VideoList } from "../../../components";
import { useGetVideosByChannelNameQuery } from "../../../api/videoApi";
import { useParams } from "react-router-dom";

function ChannelVideosPage() {
  const { username: channelName } = useParams();
  const [cursor, setCursor] = useState();
  const { data, error, isLoading, isFetching } = useGetVideosByChannelNameQuery(
    {
      channelName,
      cursor,
      limit: 10,
    }
  );

  useEffect(() => {
    if (error) {
      console.error("ERROR:: ", error);
    }
  }, [error]);

  // Infinite scroll
  const nextCursor = data?.data.nextCursor;
  const sentinelRef = useRef(null);

  const loadMore = useCallback(() => {
    if (nextCursor && !isFetching) setCursor(nextCursor);
  }, [nextCursor, isFetching]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !nextCursor) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "300px" } // start loading before the user hits the bottom
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore, nextCursor]);

  return (
    <div className="mt-3 mb-20">
      {/* skeleton loading  */}
      {isLoading ||
        (isFetching && (
          <GridContainer colWidth="14rem">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-36 animate-pulse bg-gray-100 dark:bg-neutral-800 rounded-xl"
              ></div>
            ))}
          </GridContainer>
        ))}
      {/* {error && <div>ERROR:: {error.error}</div>} */}
      {data?.data.videos && (
        <GridContainer colWidth="14rem">
          <VideoList
            videos={data?.data.videos}
            hideProfile={true}
            hideChannelName={true}
            cardHeight="h-24 sm:h-28 md:h-32 lg:h-36"
            fontSize="text-sm md:text-base"
            cardType="flex justify-between gap-x-1.5 md:block"
            spaceY="space-y-0 lg:space-y-2"
          />
        </GridContainer>
      )}
      {nextCursor && (
        <div ref={sentinelRef}>
          {isFetching ? (
            <GridContainer colWidth="14rem">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-36 animate-pulse bg-gray-100 dark:bg-neutral-800 rounded-xl"
                ></div>
              ))}
            </GridContainer>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default ChannelVideosPage;
