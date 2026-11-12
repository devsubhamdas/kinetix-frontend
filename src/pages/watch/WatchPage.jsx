import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// global components
import {
  Navbar,
  FlexContainer,
  VideoList,
  AddComment,
  CommentList,
  LoginModal,
} from "../../components";

// local components
import { VideoPlayer } from "./components/VideoPlayer.jsx";
import VideoInfoAndStats from "./components/VideoInfoAndStats.jsx";
import ChannelInfoAndStats from "./components/ChannelInfoAndStats.jsx";
import SocialActions from "./components/SocialActions.jsx";
import CommentSection from "./components/CommentSection.jsx";
import VideoSection from "./components/VideoSection.jsx";
import RecommendVideoSection from "./components/RecommendVideoSection.jsx";
import {
  VideoSectionSkeleton,
  CommentSectionSkeleton,
  RecommendVideoSectionSkeleton,
  WatchPageSkeleton,
} from "../../components/index.js";

import {
  useGetVideoByIdQuery,
  useGetVideosByRecommendationQuery,
} from "../../api/videoApi.js";
import {
  useGetChannelInfoAndStatsQuery,
  useGetUserQuery,
} from "../../api/userApi.js";
import { useGetAllCommentsByRefIdQuery } from "../../api/commentApi.js";

import {
  openLoginModal,
  closeLoginModal,
} from "../../features/global/globalSlice.js";
import { useInitializeAuth } from "../../hooks/useAuth.js";

function WatchPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoginModalOpen = useSelector(
    (state) => state.global.isLoginModalOpen
  );
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  useInitializeAuth();

  // get user
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { data: user } = useGetUserQuery(accessToken, {
    skip: !loginStatus,
  });

  // fetch video by id
  const {
    data: video,
    error: videoError,
    isLoading: videoIsLoading,
    refetch: refetchVideo,
  } = useGetVideoByIdQuery({
    id,
    accessToken,
  });

  const channelName = video?.data?.owner?.username;

  // fetch channel info
  const { data: channel, refetch: refetchChannelInfoAndStats } =
    useGetChannelInfoAndStatsQuery(
      {
        channelName,
        accessToken,
      },
      {
        skip: !channelName,
      }
    );

  // fetch comments
  const {
    data: comments,
    error: commentsError,
    isLoading: commentsIsLoading,
    refetch: refetchComments,
  } = useGetAllCommentsByRefIdQuery(id);

  // recommended videos infinite scroll
  const [cursor, setCursor] = useState();
  // The sentinel element lives in STATE, so the effect below re-runs
  // whenever the element mounts/unmounts.
  const [sentinel, setSentinel] = useState(null);
  const {
    data,
    error: recommendedVideosError,
    isLoading: recommendedVideosIsLoading,
    isFetching: recommendedVideosIsFetching,
  } = useGetVideosByRecommendationQuery({ cursor, limit: 10 });

  const nextCursor = data?.data?.nextCursor;
  const hasMore = data?.data?.hasNextPage ?? !!nextCursor;

  const loadMore = useCallback(() => {
    if (hasMore && nextCursor && !recommendedVideosIsFetching) {
      setCursor(nextCursor);
    }
  }, [hasMore, nextCursor, recommendedVideosIsFetching]);

  useEffect(() => {
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinel, hasMore, loadMore]);

  // start from the first page when the watched video changes
  useEffect(() => {
    setCursor(null);
  }, [id]);

  // scroll to top if videoFile changes
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, [video?.data.videoFile]);

  // when login status changes, refetch to show updated video/channel info
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    refetchVideo();
    if (channelName) refetchChannelInfoAndStats();
  }, [loginStatus]);

  useEffect(() => {
    if (videoError) console.error("VideoError::", videoError);
    if (recommendedVideosError)
      console.error("RecommendedVideosError::", recommendedVideosError);
    if (commentsError) console.error("CommentsError::", commentsError);
  }, [videoError, recommendedVideosError, commentsError]);

  if (!isAuthenticated) return <WatchPageSkeleton />;

  return (
    <>
      <Navbar openModal={() => dispatch(openLoginModal())} />
      <LoginModal
        closeModal={() => dispatch(closeLoginModal())}
        isModalOpen={isLoginModalOpen}
      />
      <main className="max-w-[1800px] lg:mx-auto mb-5 md:mb-9 lg:mb-16">
        {videoIsLoading && (
          <div>
            <VideoSectionSkeleton />
          </div>
        )}

        {!videoIsLoading && video && (
          <FlexContainer
            className={"flex-col md:flex-row"}
            gapX="md:gap-x-5 lg:gap-x-10"
          >
            <VideoSection>
              <VideoPlayer video={video} />
              <VideoInfoAndStats
                thumbnail={video?.data.thumbnail}
                title={video?.data.title}
                views={video?.data.views}
                description={video?.data.description}
                tags={video?.data.tags}
                genre={video?.data.genre}
                createdAt={video?.data.createdAt}
              >
                <ChannelInfoAndStats
                  channel={channel?.data.username}
                  profile={channel?.data.avatar}
                  subscribersCount={channel?.data.subscribersCount}
                  isSubscribed={channel?.data.isSubscribed}
                  refetch={refetchChannelInfoAndStats}
                />
                <SocialActions
                  likesCount={video?.data.likesCount}
                  dislikesCount={video?.data.dislikesCount}
                  hasLiked={video?.data.hasLiked}
                  hasDisliked={video?.data.hasDisliked}
                  refetch={refetchVideo}
                />
              </VideoInfoAndStats>
              <CommentSection>
                <AddComment
                  user={user?.data}
                  refType={"Video"}
                  refId={id}
                  refetch={refetchComments}
                />
                {commentsIsLoading && (
                  <div>
                    <CommentSectionSkeleton />
                  </div>
                )}
                {comments && <CommentList comments={comments.data} />}
              </CommentSection>
            </VideoSection>

            <RecommendVideoSection>
              {recommendedVideosIsLoading && (
                <div>
                  <RecommendVideoSectionSkeleton />
                </div>
              )}

              {data?.data.videos && (
                <VideoList
                  videos={data?.data.videos}
                  cardType="flex"
                  hideProfile={true}
                  spaceX="space-x-3"
                  spaceY="space-y-0"
                  fontSize="text-sm lg:text-base"
                  lineHeight="leading-4 lg:leading-5"
                  fontWeight="font-medium"
                />
              )}

              {/* React calls setSentinel(node) on mount, setSentinel(null) on unmount */}
              {hasMore && (
                <div ref={setSentinel} style={{ minHeight: 1 }}>
                  {recommendedVideosIsFetching && (
                    <RecommendVideoSectionSkeleton />
                  )}
                </div>
              )}
            </RecommendVideoSection>
          </FlexContainer>
        )}
      </main>
    </>
  );
}

export default WatchPage;
