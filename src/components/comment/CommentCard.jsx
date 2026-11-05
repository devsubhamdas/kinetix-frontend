import React from "react";
import { formatDistanceToNow } from "date-fns";
import {
  BiLike,
  BiDislike,
  BiSolidLike,
  BiSolidDislike,
  BiCommentDetail,
} from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

function CommentCard({ content, avatar, username, createdAt, updatedAt }) {
  const hoverClass = "hover:bg-gray-200 dark:hover:bg-neutral-700";
  const isEdited = createdAt !== updatedAt;

  return (
    <div className="flex gap-1 lg:gap-2 text-neutral-900 dark:text-neutral-100">
      <div className="p-0.5">
        <img
          src={avatar || "/temp/default-avatar.png"}
          alt=""
          className="w-8 aspect-square object-cover rounded-full bg-gray-100 dark:bg-neutral-800"
        />
      </div>

      <div className="flex-1">
        <div className="text-sm">
          <span className="font-medium">@{username}</span>{" "}
          <span className="text-gray-600 dark:text-neutral-400 text-xs">
            {formatDistanceToNow(new Date(isEdited ? updatedAt : createdAt), {
              addSuffix: true,
            }).replace("about", "")}
            {isEdited && " (edited)"}
          </span>
        </div>

        <div className="text-sm pr-4 mt-0.5 lg:mt-1">
          <p>{content}</p>
        </div>

        <div className="flex gap-x-2 items-center text-sm mt-0.5 md:mt-1 lg:mt-1.5">
          <div className="flex items-center">
            <button className={`${hoverClass} p-1.5 rounded-full`}>
              <BiLike className="text-sm md:text-lg lg:text-xl" />
            </button>
            <span>277</span>
          </div>
          <div className="flex items-center">
            <button className={`${hoverClass} p-1.5 rounded-full`}>
              <BiDislike className="text-sm md:text-lg lg:text-xl" />
            </button>
            <span>24</span>
          </div>
          <div className="ml-9">
            <button
              className={`${hoverClass} hidden lg:inline font-medium px-3 py-1.5 rounded-full`}
            >
              Reply
            </button>
            <button className={`${hoverClass} p-1.5 rounded-full`}>
              <BiCommentDetail className="text-sm md:text-lg lg:hidden" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <BsThreeDotsVertical className="text-xl text-gray-600 dark:text-neutral-400" />
      </div>
    </div>
  );
}

export default CommentCard;
