import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import useComment from "../../hooks/useComment.js";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "../../features/global/globalSlice.js";

function AddComment({
  user = undefined,
  refType = "",
  refId = "",
  refetch = () => {},
}) {
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const content = watch("content");

  // add comment api call
  const {
    addCommentOnSubmit,
    addCommentState: { isError, isLoading, isSuccess },
  } = useComment();

  // to reset comment input field and fetch updated comment list
  useEffect(() => {
    if (!isError && !isLoading && isSuccess) {
      reset();
      refetch();
    }
  }, [isError, isLoading]);

  return (
    <div className="flex items-center gap-x-2 p-3 rounded-xl bg-gray-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="p-0.5">
        <img
          src={loginStatus ? user?.avatar : "/assets/default-avatar.png"}
          alt=""
          className="w-8 aspect-square object-cover rounded-full bg-gray-200 dark:bg-neutral-700"
        />
      </div>

      <div className="flex-1">
        <form onSubmit={handleSubmit(addCommentOnSubmit)}>
          <div className="flex gap-x-1.5">
            <textarea
              rows="1"
              className="outline-none border rounded-full px-4 py-1.5 text-xs md:text-sm w-full resize-none read-only:cursor-pointer
                       bg-white text-neutral-900 placeholder:text-neutral-500 border-neutral-300 focus:border-blue-600
                       dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-400
                       dark:border-neutral-700 dark:focus:border-blue-500"
              id="content"
              placeholder="add comment..."
              readOnly={!loginStatus}
              {...register("content", { required: true })}
              onClick={() => {
                if (!loginStatus) {
                  dispatch(openLoginModal());
                }
              }}
            />
            <input
              type="hidden"
              value={refType}
              {...register("refType", { required: true })}
            />
            <input
              type="hidden"
              value={refId}
              {...register("refId", { required: true })}
            />

            {/* submit for larger screen */}
            <input
              type="submit"
              value="Comment"
              className="hidden lg:inline text-sm font-medium px-3 py-2 rounded-full text-white cursor-pointer
                       bg-blue-600 hover:bg-blue-700
                       disabled:bg-gray-400 disabled:cursor-not-allowed
                       dark:disabled:bg-neutral-600 dark:disabled:text-neutral-400"
              disabled={!content || isLoading}
            />
            <input
              type="reset"
              value="Cancel"
              className="hidden lg:inline text-sm font-medium px-3 py-2 rounded-full text-white cursor-pointer
                       bg-gray-500 hover:bg-gray-600
                       dark:bg-neutral-600 dark:hover:bg-neutral-500"
              onClick={() => reset()}
            />

            {/* submit for mobile devices */}
            <button
              type="submit"
              className="lg:hidden md:px-1.5 disabled:invisible"
              disabled={!content || isLoading}
            >
              <PiPaperPlaneRightFill className="text-xl text-blue-600 dark:text-blue-400" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddComment;
