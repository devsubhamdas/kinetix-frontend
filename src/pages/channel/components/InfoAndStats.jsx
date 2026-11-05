import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSubscription from "../../../hooks/useSubscription.js";
import { openLoginModal } from "../../../features/global/globalSlice.js";

import { BsDot } from "react-icons/bs";

const buttonClass = `font-semibold text-sm px-2.5 py-1 lg:text-base lg:px-3.5 lg:py-1.5 rounded-full
  bg-gray-900 hover:bg-gray-800 text-white
  disabled:opacity-60 disabled:cursor-not-allowed
  dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900`;

function InfoAndStats({
  profile = "",
  channelName = "",
  subscribersCount = "",
  videosCount = 0,
  fullName = "",
  isSubscribed = false,
  refetch = () => {},
}) {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const { subscribeOnClick, unsubscribeOnClick } = useSubscription();

  return (
    <div className="flex gap-5 mt-3 lg:mt-5 mx-2.5 lg:mx-0 text-neutral-900 dark:text-neutral-100">
      <div>
        <img
          src={profile || "/temp/default-avatar.png"}
          alt=""
          className="w-20 md:w-28 lg:w-36 aspect-square object-cover object-center rounded-full bg-gray-100 dark:bg-neutral-800"
        />
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          {channelName}
        </h1>
        <div className="text-sm md:text-base lg:text-lg text-gray-500 dark:text-neutral-400">
          <span className="block lg:inline">@{fullName}</span>
          <BsDot className="hidden lg:inline text-xs" />
          <span>{subscribersCount} subscribers</span>
          <BsDot className="inline text-xs" />
          <span>{videosCount} videos</span>
        </div>

        <div className="mt-2">
          <button
            className={buttonClass}
            onClick={() => {
              if (!loginStatus) {
                dispatch(openLoginModal());
              } else if (isSubscribed) {
                unsubscribeOnClick(refetch);
              } else {
                subscribeOnClick(refetch);
              }
            }}
          >
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoAndStats;
