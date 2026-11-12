import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { useGetVidoesBySearchTermQuery } from "../../api/videoApi";
import { VideoList, SearchPageSkeleton } from "../../components";

const SearchResults = ({ term }) => {
  // Scroll to top whenever the search term changes
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [term]);

  const [cursor, setCursor] = useState(null);
  const [sentinelRef, setSentinelRef] = useState(null);

  const { data, isLoading, isError, isFetching, error } =
    useGetVidoesBySearchTermQuery(
      { term, cursor },
      { skip: !term, refetchOnMountOrArgChange: true }
    );

  const videos = useMemo(() => {
    const incoming = data?.data?.videos ?? [];
    return [...new Map(incoming.map((v) => [v._id, v])).values()];
  }, [data?.data?.videos]);

  const nextCursor = data?.data?.meta?.nextCursor ?? null;
  const hasMore = data?.data?.meta?.hasNextPage ?? !!nextCursor;

  const loadMore = useCallback(() => {
    // nextCursor === cursor means this page was already requested
    if (!nextCursor || nextCursor === cursor || isFetching) return;
    setCursor(nextCursor);
  }, [nextCursor, cursor, isFetching]);

  // Infinite scroll: only observe while idle
  useEffect(() => {
    if (!sentinelRef || !hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinelRef);
    return () => observer.disconnect();
  }, [sentinelRef, hasMore, isFetching, loadMore]);

  // error log
  useEffect(() => {
    if (error) console.error("ERROR:: ", error);
  }, [error]);

  return (
    <div className="px-2 sm:px-4 md:px-0 mb-24 ">
      {isLoading && <SearchPageSkeleton />}

      {!isLoading && !isError && videos.length > 0 && (
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
