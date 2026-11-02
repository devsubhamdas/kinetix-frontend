import React, { useEffect } from "react";
import { VideoList, GridContainer, HomePageSkeleton } from "../../components";
import { useGetVideosByRecommendationQuery } from "../../api/videoApi.js";

function HomePage() {
  const {
    data: videos,
    error,
    isLoading,
  } = useGetVideosByRecommendationQuery();

  useEffect(() => {
    if (error) {
      console.error("ERROR:: ", error);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isLoading]);

  return (
    <>
      <main className="w-full mb-20">
        {isLoading && (
          <div className="h-dvh overflow-hidden">
            <GridContainer>
              <HomePageSkeleton />
            </GridContainer>
          </div>
        )}
        {/* {error && <div>ERROR:: {error.error}</div>} */}
        {videos && (
          <GridContainer>
            <VideoList videos={videos.data} />
          </GridContainer>
        )}
      </main>
    </>
  );
}

export default HomePage;
