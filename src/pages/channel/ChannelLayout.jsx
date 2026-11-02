import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { useGetChannelInfoAndStatsQuery } from "../../api/userApi";

// local components
import Banner from "./components/Banner.jsx";
import InfoAndStats from "./components/InfoAndStats.jsx";
import ChannelPageNavBar from "./components/ChannelPageNavBar.jsx";
import { ChannelPageSkeleton } from "../../components/index.js";

function ChannelLayout() {
  const { username: channelName } = useParams();

  const {
    data: channel,
    isLoading: channelLoading,
    refetch,
  } = useGetChannelInfoAndStatsQuery({
    channelName,
    accessToken: localStorage.getItem("accessToken"),
  });

  // if user logout refetch channelinfoandstatus
  const authState = useSelector((state) => state.auth);
  useEffect(() => {
    refetch();
  }, [authState]);

  if (channelLoading) {
    return (
      <>
        <ChannelPageSkeleton />
      </>
    );
  }
  if (!channelLoading && !channel) {
    return (
      <>
        <div>channel not found</div>
      </>
    );
  }

  return (
    <>
      <main className="w-full">
        <Banner
          coverImage={channel?.data.coverImage || "/temp/default-banner.png"}
        />
        <InfoAndStats
          profile={channel?.data.avatar || "/temp/default-avatar.png"}
          channelName={channel?.data.username || null}
          subscribersCount={channel?.data.subscribersCount}
          videosCount={channel?.data.videosCount}
          fullName={channel?.data.fullName}
          isSubscribed={channel?.data.isSubscribed}
          refetch={refetch}
        />
        <ChannelPageNavBar />
        <Outlet />
      </main>
    </>
  );
}

export default ChannelLayout;
