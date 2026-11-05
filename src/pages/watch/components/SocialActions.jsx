import React from "react";

import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { RiShareForwardLine, RiFlagLine } from "react-icons/ri";
import { LiaDownloadSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "../../../features/global/globalSlice";
import useImpression from "../../../hooks/useImpression.js";
import { useParams } from "react-router-dom";

const pillClass = "rounded-full bg-gray-100 dark:bg-neutral-800";
const actionBtn = "px-3.5 py-1";

function SocialActions({
  likesCount = 0,
  dislikesCount = 0,
  hasLiked = false,
  hasDisliked = false,
  refetch = () => {},
}) {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  const refType = "Video";
  const { id: refId } = useParams();
  const {
    addLikeOnClick,
    addLikeState: { isLoading: addLikeIsLoading },
    deleteLikeOnClick,
    deleteLikeState: { isLoading: deleteLikeIsLoading },
    addDislikeOnClick,
    addDisLikeState: { isLoading: addDislikeIsLoading },
    deleteDislikeOnClick,
    deleteLikeState: { isLoading: deleteDislikeIsLoading },
  } = useImpression();

  return (
    <div className="overflow-x-auto no-scrollbar mt-3 md:mt-4 text-neutral-900 dark:text-neutral-100">
      <ul className="flex items-center gap-x-1.5 md:gap-x-2.5">
        <li className={`${pillClass} flex-shrink-0`}>
          {!hasLiked ? (
            <button
              className={`${actionBtn} disabled:opacity-60 disabled:cursor-not-allowed`}
              onClick={() => {
                if (!loginStatus) {
                  dispatch(openLoginModal());
                } else {
                  addLikeOnClick(refType, refId, refetch);
                }
              }}
              disabled={addLikeIsLoading}
            >
              <BiLike className="inline text-lg md:text-xl lg:text-2xl" />
              <span className="text-sm md:text-base font-medium ml-1.5">
                {likesCount}
              </span>
            </button>
          ) : (
            <button
              className={`${actionBtn} disabled:opacity-60 disabled:cursor-not-allowed`}
              onClick={() => {
                if (!loginStatus) {
                  dispatch(openLoginModal());
                } else {
                  deleteLikeOnClick(refType, refId, refetch);
                }
              }}
              disabled={deleteLikeIsLoading}
            >
              <BiSolidLike className="inline text-lg md:text-xl lg:text-2xl" />
              <span className="text-sm md:text-base font-medium ml-1.5">
                {likesCount}
              </span>
            </button>
          )}

          <span className="text-sm text-gray-500 dark:text-neutral-500">|</span>

          {!hasDisliked ? (
            <button
              className={`${actionBtn} disabled:opacity-60 disabled:cursor-not-allowed`}
              onClick={() => {
                if (!loginStatus) {
                  dispatch(openLoginModal());
                } else {
                  addDislikeOnClick(refType, refId, refetch);
                }
              }}
              disabled={addDislikeIsLoading}
            >
              <BiDislike className="inline text-lg md:text-xl lg:text-2xl" />
              <span className="text-sm md:text-base font-medium ml-1.5">
                {dislikesCount}
              </span>
            </button>
          ) : (
            <button
              className={`${actionBtn} disabled:opacity-60 disabled:cursor-not-allowed`}
              onClick={() => {
                if (!loginStatus) {
                  dispatch(openLoginModal());
                } else {
                  deleteDislikeOnClick(refType, refId, refetch);
                }
              }}
              disabled={deleteDislikeIsLoading}
            >
              <BiSolidDislike className="inline text-lg md:text-xl lg:text-2xl" />
              <span className="text-sm md:text-base font-medium ml-1.5">
                {dislikesCount}
              </span>
            </button>
          )}
        </li>

        <li className={`${pillClass} flex-shrink-0`}>
          <button className={actionBtn}>
            <RiShareForwardLine className="inline text-lg md:text-xl lg:text-2xl" />
            <span className="text-sm md:text-base font-medium">Share</span>
          </button>
        </li>

        <li className={`${pillClass} flex-shrink-0`}>
          <button className={actionBtn}>
            <LiaDownloadSolid className="inline text-lg md:text-xl lg:text-2xl" />
            <span className="text-sm md:text-base font-medium">Save</span>
          </button>
        </li>

        <li className={`${pillClass} flex-shrink-0`}>
          <button className={actionBtn}>
            <RiFlagLine className="inline text-lg md:text-xl lg:text-2xl" />
            <span className="text-sm md:text-base font-medium">Report</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SocialActions;
