import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { useGetVidoesBySearchTermQuery } from "../../api/videoApi";
import { VideoList, SearchPageSkeleton } from "../../components";

const SearchResults = ({ term }) => {
  const [cursor, setCursor] = useState(null);
  // Scroll to top whenever the search term changes
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [term]);

  const { data, isLoading, isError, isFetching, error } =
    useGetVidoesBySearchTermQuery(
      { term, cursor },
      { skip: !term, refetchOnMountOrArgChange: true }
    );
  const videos = data?.data?.videos;
  const nextCursor = data?.data?.meta?.nextCursor;
  const hasMore = data?.data?.meta?.hasNextPage ?? !!nextCursor;
  const [sentinelRef, setSentinelRef] = useState(null);

  const loadMore = useCallback(() => {
    if (nextCursor && !isFetching) setCursor(nextCursor);
  }, [nextCursor, isFetching]);

  // Infinite scroll
  useEffect(() => {
    const el = sentinelRef;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "300px" } // start loading before the user hits the bottom
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sentinelRef, hasMore, loadMore]);

  useEffect(() => {
    if (error) console.error("ERROR:: ", error);
  }, [error]);

  return (
    <div className="px-2 sm:px-4 md:px-0 mb-12">
      {isLoading && <SearchPageSkeleton />}

      {!isLoading && !isError && videos && (
        <div className="w-full max-w-4xl mr-0 md:mr-4">
          <div className="md:hidden space-y-6">
            <VideoList
              videos={videos}
              cardType="block"
              spaceX="space-x-3"
              spaceY="space-y-0"
              fontWeight="font-medium"
              hideDescription={false}
            />
          </div>
          <div className="hidden md:block space-y-2">
            <VideoList
              videos={videos}
              cardType="flex"
              spaceX="space-x-3"
              spaceY="space-y-0"
              fontWeight="font-medium"
              hideDescription={false}
            />
          </div>
        </div>
      )}

      {hasMore && (
        <div ref={setSentinelRef}>
          {isFetching && cursor && <SearchPageSkeleton />}
        </div>
      )}
    </div>
  );
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const term = (searchParams.get("q") ?? "").trim();

  // key={term} remounts SearchResults on every term change,
  // so cursor always starts as null for the new term
  return <SearchResults key={term} term={term} />;
};

export default SearchPage;
