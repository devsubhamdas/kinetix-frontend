import React from "react";
import { formatDistanceToNow } from "date-fns";
import { NavLink, useNavigate } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";

function VideoCard({
  id = "",
  thumbnail = "",
  profile = "",
  title = "",
  channelname = "",
  views = 0,
  duration = "00:00",
  createdAt = "",
  hideProfile = false,
  hideChannelName = false,
  cardType = "block",
  cardHeight = "aspect-video",
  cardWidth = "full",
  fontSize = "lg:text-lg",
  fontWeight = "font-semibold",
  lineHeight = "leading-4 lg:leading-5",
  spaceY = "space-y-2",
  spaceX = "space-x-0",
}) {
  const navigate = useNavigate();

  const navigateToChannelPage = (e) => {
    e.preventDefault();
    navigate(`/channel/${channelname}`);
  };

  // converts seconds to "hh:mm:ss"
  const formatSeconds = (seconds) => {
    const duration = {
      hour: Math.floor(seconds / 3600),
      min: Math.floor((seconds % 3600) / 60),
      sec: seconds % 60,
    };

    const timeSegments = [];
    if (duration.hour > 0) {
      timeSegments.push(String(duration.hour).padStart(2, "0"));
    }
    timeSegments.push(String(duration.min).padStart(2, "0"));
    timeSegments.push(String(duration.sec).padStart(2, "0"));

    return timeSegments.join(":");
  };

  return (
    <div>
      <NavLink
        to={`/watch/v/${id}`}
        className={`${cardType} ${spaceY} ${spaceX} text-neutral-900 dark:text-neutral-100`}
      >
        <div className={`relative ${cardHeight} ${cardWidth} flex-1`}>
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              className="w-full h-full object-cover rounded-xl bg-gray-100 dark:bg-neutral-800"
            />
          ) : (
            <picture>
              <source
                srcSet="/assets/default-thumbnail-dark.jpg"
                media="(prefers-color-scheme: dark)"
              />
              <img
                src="/assets/default-thumbnail.png"
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            </picture>
          )}
          <div className="absolute bottom-2 right-2 text-sm font-semibold bg-black bg-opacity-70 px-1 rounded">
            <span className="text-white">
              {formatSeconds(Math.round(duration))}
            </span>
          </div>
        </div>

        <div className="flex gap-x-2 flex-1">
          <div
            className={hideProfile ? "hidden" : "w-9 aspect-square"}
            onClick={navigateToChannelPage}
          >
            <img
              src={profile || "/assets/default-avatar.png"}
              alt=""
              className="w-full aspect-square rounded-full bg-gray-100 dark:bg-neutral-800"
            />
          </div>

          <div className="flex-grow">
            <h1 className={`${fontSize} ${fontWeight} ${lineHeight}`}>
              {title}
            </h1>
            <h2
              className={
                hideChannelName
                  ? "hidden"
                  : "inline lg:block text-xs md:text-sm font-semibold mt-1.5 text-gray-600 dark:text-neutral-400"
              }
            >
              <span onClick={navigateToChannelPage}>{channelname} </span>
            </h2>
            <span className="text-xs md:text-sm leading-3 text-gray-600 dark:text-neutral-400">
              <BsDot
                className={hideProfile ? "hidden" : "inline lg:hidden text-xs"}
              />
              <span>{views} views</span>
              <BsDot className="inline text-xs" />
              <span>
                {formatDistanceToNow(new Date(createdAt), {
                  addSuffix: true,
                }).replace("about", "")}
              </span>
            </span>
          </div>

          <div>
            <BsThreeDotsVertical
              className="text-xl text-gray-600 dark:text-neutral-400"
              onClick={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default VideoCard;
