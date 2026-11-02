import React, { useEffect } from "react";
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
import VideoPlayer from "./components/VideoPlayer.jsx";
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
import useAuth from "../../hooks/useAuth.js";

// main component
function WatchPage() {
  const dispatch = useDispatch();
  const { username: channelName, id } = useParams();

  // for login modal
  const isLoginModalOpen = useSelector(
    (state) => state.global.isLoginModalOpen
  );

  // fetch video by id
  const {
    data: video,
    error: videoError,
    isLoading: videoIsLoading,
    refetch: refetchVideo,
  } = useGetVideoByIdQuery({
    channelName,
    id,
    accessToken: localStorage.getItem("accessToken"),
  });

  // fetch channel info
  const { data: channel, refetch: refetchChannelInfoAndStats } =
    useGetChannelInfoAndStatsQuery({
      channelName,
      accessToken: localStorage.getItem("accessToken"),
    });

  // get user
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const { data: user } = useGetUserQuery(localStorage.getItem("accessToken"), {
    skip: !loginStatus,
  });

  // fetch comments
  const {
    data: comments,
    error: commentsError,
    isLoading: commentsIsLoading,
    refetch: refetchComments,
  } = useGetAllCommentsByRefIdQuery(id);

  // fetch recommended videos
  const {
    data: videos,
    error: recommendedVideosError,
    isLoading: recommendedVideosIsLoading,
  } = useGetVideosByRecommendationQuery();

  // scroll to top on if videoFile changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [video?.data.videoFile]);

  // when user login status changed refetch video to show updated video info and channle info
  useEffect(() => {
    refetchVideo();
    refetchChannelInfoAndStats();
  }, [loginStatus]);

  useEffect(() => {
    if (videoError) {
      console.error("VideoError::", videoError);
    }
    if (recommendedVideosError) {
      console.error("RecommendedVideosError::", recommendedVideosError);
    }
    if (commentsError) {
      console.error("CommentsError::", commentsError);
    }
  }, []);

  // try to authenticate on first render
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);
  const { initializeAuth } = useAuth();
  initializeAuth();

  // if (!isAuthenticated)
  //   return (
  //     <>
  //       <div>Authentication in progress, please wait...</div>
  //     </>
  //   );

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
        {/* {videoError && <div>ERROR::{videoError.error}</div>} */}
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
                {/* {commentsError && <div>ERROR:: {commentsError.error}</div>} */}
                {comments && <CommentList comments={comments.data} />}
              </CommentSection>
            </VideoSection>
            <RecommendVideoSection>
              {recommendedVideosIsLoading && (
                <div>
                  <RecommendVideoSectionSkeleton />
                </div>
              )}
              {/* {recommendedVideosError && (
                <div>ERROR:: {recommendedVideosError.error}</div>
              )} */}
              {videos && (
                <VideoList
                  videos={videos.data}
                  cardType="flex"
                  hideProfile={true}
                  spaceX="space-x-3"
                  spaceY="space-y-0"
                  fontSize="text-sm lg:text-base"
                  lineHeight="leading-4 lg:leading-5"
                  fontWeight="font-medium"
                />
              )}
            </RecommendVideoSection>
          </FlexContainer>
        )}
      </main>
    </>
  );
}

export default WatchPage;
