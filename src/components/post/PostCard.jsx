import React from "react";
import { NavLink } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  BiLike,
  BiDislike,
  BiSolidLike,
  BiSolidDislike,
  BiCommentDetail,
} from "react-icons/bi";
import { RiShareForwardLine, RiFlagLine } from "react-icons/ri";

const hoverClass = "hover:bg-gray-200 dark:hover:bg-neutral-700";
const mutedText = "text-gray-600 dark:text-neutral-400";

function PostCard() {
  return (
    <div
      className="p-2 md:px-3 md:py-5 lg:w-3/4 border-b max-md:last:border-b-0 md:border md:rounded-2xl md:mx-5 lg:ml-5
               text-neutral-900 border-neutral-200
               dark:text-neutral-100 dark:border-neutral-700"
    >
      <div className="flex gap-x-3">
        <div className="w-9 md:w-11 aspect-square">
          <NavLink to="/channel/YourChannelName">
            <img
              src="/assets/test-profile.png"
              alt=""
              className="w-full aspect-square object-cover rounded-full bg-gray-100 dark:bg-neutral-800"
            />
          </NavLink>
        </div>
        <div>
          <NavLink to="/channel/YourChannelName">
            <span className="text-sm md:text-base font-medium">
              YourChannelName
            </span>{" "}
            <span className="text-xs md:text-sm text-gray-600 dark:text-neutral-400">
              3 days ago
            </span>
          </NavLink>
        </div>
        <div className="ml-auto self-center">
          <BsThreeDotsVertical className="text-xl text-gray-600 dark:text-neutral-400" />
        </div>
      </div>

      <div className="px-3 mt-0.5 md:mt-1 lg:mt-2">
        <NavLink to="/post/YourChannelName/p_id/123">
          <p className="lg:pr-4">
            Keep moving forward. Even small steps add up to big results.
            Progress is progress, no matter how slow—just don't stop. You have
            got this!
          </p>
        </NavLink>
      </div>

      <div className="px-3 md:px-9 lg:px-14 mt-5">
        <NavLink to="/post/YourChannelName/p_id/123">
          <img
            src="/assets/test-post.png"
            alt=""
            className="w-full rounded-2xl aspect-square object-cover bg-gray-100 dark:bg-neutral-800"
          />
        </NavLink>
      </div>

      <div className="md:mt-2 md:ml-9 lg:ml-14 px-3 md:px-0">
        <ul className="flex gap-x-6">
          <li className="flex items-center">
            <button className={`${hoverClass} p-2 rounded-full`}>
              <BiLike className="md:text-xl lg:text-2xl" />
            </button>
            <span className={`${mutedText} mx-1 text-xs md:text-sm`}>22</span>
          </li>
          <li className="flex items-center">
            <button className={`${hoverClass} p-2 rounded-full`}>
              <BiDislike className="md:text-xl lg:text-2xl" />
            </button>
            <span className={`${mutedText} mx-1 text-xs md:text-sm`}>3</span>
          </li>
          <li className="flex items-center ml-auto md:ml-0">
            <button className={`${hoverClass} p-2 rounded-full`}>
              <RiShareForwardLine className="md:text-xl lg:text-2xl" />
            </button>
          </li>
          <li className="flex items-center">
            <NavLink
              to="/post/YourChannelName/p_id/123"
              className={`${hoverClass} py-2 px-4 rounded-full`}
            >
              <BiCommentDetail className="md:text-xl inline lg:text-2xl" />
              <span className="mx-1 font-medium text-xs md:text-sm">8</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PostCard;
