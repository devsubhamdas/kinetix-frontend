import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useInitializeAuth } from "../../hooks/useAuth.js";
import {
  useGetSubscribeChannelsQuery,
  useGetSubscribeChannelsVideosQuery,
} from "../../api/subscriptionApi.js";
import {
  GridContainer,
  HomePageSkeleton,
  VideoList,
} from "../../components/index.js";
import SubscribedChannels from "./components/SubscribedChannelsSection.jsx";

const SubscriptionPage = () => {
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [cursor, setCursor] = useState();

  const {
    data: channelData,
    isError: channelIsError,
    isLoading: channelIsLoading,
  } = useGetSubscribeChannelsQuery({ accessToken });
  const {
    data: videoData,
    isError: videoIsError,
    isLoading: videoIsLoading,
    isFetching: videoIsFetching,
    error: videoError,
  } = useGetSubscribeChannelsVideosQuery({ accessToken, cursor });

  const nextCursor = videoData?.data?.meta.nextCursor;
  const videos = videoData?.data?.videos;
  const sentinelRef = useRef(null);

  const subscribedChannels = channelData?.data?.subscribedChannels;

  const loadMore = useCallback(() => {
    if (nextCursor && !videoIsFetching) setCursor(nextCursor);
  }, [nextCursor, videoIsFetching]);

  // Infinite scroll
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

  // Scroll to top always after return
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <main className="mb-20 w-full">
      <div>
        <SubscribedChannels subscribedChannels={subscribedChannels} />
      </div>
      <div className="mt-8">
        <div className="mx-4">
          <span className="text-xl">Latest</span>
        </div>

        {videoIsLoading && (
          <div className="h-dvh overflow-hidden">
            <GridContainer colWidth={"19rem"} rowGap="0rem" columnGap="0rem">
              <HomePageSkeleton />
            </GridContainer>
          </div>
        )}
        {videos && (
          <GridContainer colWidth={"19rem"} rowGap="0rem" columnGap="0rem">
            <VideoList videos={videos} />
          </GridContainer>
        )}
        {/* Sentinel: only rendered while there is another page */}
        {nextCursor && (
          <div ref={sentinelRef}>
            {videoIsFetching && (
              <div className="h-dvh overflow-hidden">
                <GridContainer
                  colWidth={"19rem"}
                  rowGap="0rem"
                  columnGap="0rem"
                >
                  <HomePageSkeleton />
                </GridContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default SubscriptionPage;
