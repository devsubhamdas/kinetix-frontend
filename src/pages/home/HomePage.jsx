import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { VideoList, GridContainer, HomePageSkeleton } from "../../components";
import { useGetVideosByRecommendationQuery } from "../../api/videoApi.js";

function HomePage() {
  const [cursor, setCursor] = useState();

  // Scroll to top always after return
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const { data, error, isLoading, isFetching } =
    useGetVideosByRecommendationQuery({ cursor });

  const nextCursor = data?.data?.nextCursor;
  const sentinelRef = useRef(null);

  const loadMore = useCallback(() => {
    if (nextCursor && !isFetching) setCursor(nextCursor);
  }, [nextCursor, isFetching]);

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

  useEffect(() => {
    if (error) console.error("ERROR:: ", error);
  }, [error]);

  useEffect(() => {
    if (!isLoading) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isLoading]);

  return (
    <main className="w-full mb-20">
      {isLoading && (
        <div className="h-dvh overflow-hidden">
          <GridContainer colWidth={"22rem"} rowGap="0rem" columnGap="0rem">
            <HomePageSkeleton />
          </GridContainer>
        </div>
      )}

      {data?.data?.videos && (
        <GridContainer colWidth={"19rem"} rowGap="0rem" columnGap="0rem">
          <VideoList videos={data.data.videos} />
        </GridContainer>
      )}

      {/* Sentinel: only rendered while there is another page */}
      {nextCursor && (
        <div ref={sentinelRef}>
          {isFetching && (
            <div className="h-dvh overflow-hidden">
              <GridContainer colWidth={"22rem"} rowGap="0rem" columnGap="0rem">
                <HomePageSkeleton />
              </GridContainer>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default HomePage;
