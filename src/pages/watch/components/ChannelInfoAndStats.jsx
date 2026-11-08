import React from "react";
import { NavLink } from "react-router-dom";
import useSubscription from "../../../hooks/useSubscription.js";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal } from "../../../features/global/globalSlice";

const buttonClass = `font-medium text-sm px-2.5 py-1.5 lg:text-base lg:px-3.5 rounded-full
  bg-gray-900 hover:bg-gray-800 text-white
  disabled:opacity-60 disabled:cursor-not-allowed
  dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900`;

function ChannelInfoAndStats({
  channel = "",
  profile = "",
  subscribersCount = "",
  isSubscribed = false,
  refetch = () => {},
}) {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const {
    subscribeOnClick,
    unsubscribeOnClick,
    subscribeState: { isLoading: subscribeIsLoading },
    unsubscribeState: { isLoading: unsubscribeIsLoading },
  } = useSubscription({ channelName: channel });

  return (
    <div className="flex items-center gap-x-5 mt-3 text-neutral-900 dark:text-neutral-100">
      <div>
        <NavLink to={`/channel/${channel}`}>
          <img
            src={profile || "/assets/default-avatar.png"}
            alt=""
            className="w-11 aspect-square object-cover object-center rounded-full bg-gray-100 dark:bg-neutral-800"
          />
        </NavLink>
      </div>

      <div className="flex flex-1">
        <div className="mr-auto">
          <div className="sm:text-sm md:text-base lg:text-lg font-medium">
            <NavLink to={`/channel/${channel}`}>{channel}</NavLink>
          </div>
          <div className="text-xs md:text-sm -mt-1 text-gray-500 dark:text-neutral-400">
            {subscribersCount} subscribers
          </div>
        </div>

        <div>
          {!isSubscribed ? (
            <button
              className={buttonClass}
              onClick={() => {
                if (loginStatus) {
                  subscribeOnClick(refetch);
                } else {
                  dispatch(openLoginModal());
                }
              }}
              disabled={subscribeIsLoading}
            >
              Subscribe
            </button>
          ) : (
            <button
              className={buttonClass}
              onClick={() => {
                if (loginStatus) {
                  unsubscribeOnClick(refetch);
                } else {
                  dispatch(openLoginModal());
                }
              }}
              disabled={unsubscribeIsLoading}
            >
              Unsubscribe
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChannelInfoAndStats;
