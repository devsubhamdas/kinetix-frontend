import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsBroadcast } from "react-icons/bs";
import { LiaUploadSolid, LiaEdit } from "react-icons/lia";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import useVideo from "../../../hooks/useVideo.js";
import { useSelector } from "react-redux";

const genreOptions = [
  "video",
  "tutorials",
  "vlogs",
  "reviews",
  "live streams",
  "short films",
  "documentaries",
  "music videos",
  "interviews",
  "podcasts",
  "gameplay videos",
  "unboxings",
  "event coverage",
  "challenges",
  "reaction videos",
  "skits",
  "parodies",
  "q&a sessions",
  "educational lectures",
  "webinars",
  "time-lapse videos",
  "asmr",
  "diy projects",
  "fitness workouts",
  "travel diaries",
  "animation",
  "behind-the-scenes",
  "motivational speeches",
  "movie/tv show recaps",
  "compilation videos",
  "news reports",
];

// Shared styles so light/dark classes are written once
const borderClass = "border-neutral-200 dark:border-neutral-700";
const mutedText = "text-gray-500 dark:text-neutral-400";
const hoverClass = "hover:bg-gray-100 dark:hover:bg-neutral-700";
const errorClass = "text-xs text-red-600 dark:text-red-400";

const primaryBtn = `font-medium rounded-full
  bg-gray-900 hover:bg-gray-800 text-white
  disabled:bg-gray-700 disabled:hover:cursor-not-allowed
  dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900
  dark:disabled:bg-neutral-400`;

const inputClass = `block w-full outline-none border px-2 py-1 text-sm
  bg-white text-neutral-900 border-neutral-300 focus:border-blue-600
  dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700 dark:focus:border-blue-500
  dark:[color-scheme:dark]`;

const fileClass = "text-sm dark:[color-scheme:dark]";

function TopActionBar({ openModal }) {
  const iconBtn = `p-2 border rounded-full border-neutral-300 dark:border-neutral-700 ${hoverClass}`;

  return (
    <div className="flex flex-col md:flex-row gap-y-3">
      <div>
        <h1 className="md:text-xl lg:text-2xl font-medium">
          Channel dashboard
        </h1>
      </div>
      <div className="md:ml-auto">
        <ul className="flex gap-x-3">
          <li>
            <button className={iconBtn} onClick={openModal}>
              <LiaUploadSolid className="text-lg md:text-xl lg:text-2xl" />
            </button>
          </li>
          <li>
            <button className={iconBtn}>
              <BsBroadcast className="text-lg md:text-xl lg:text-2xl" />
            </button>
          </li>
          <li>
            <button className={iconBtn}>
              <LiaEdit className="text-lg md:text-xl lg:text-2xl" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

function UploadCard({ openModal }) {
  return (
    <div
      className={`border self-start p-4 md:p-5 rounded-3xl w-full md:w-96 ${borderClass}`}
    >
      <div className="border border-dashed rounded-xl p-3 border-neutral-300 dark:border-neutral-600">
        <div>
          <img
            src="/svg/upload_illustration.svg"
            alt=""
            className="w-full block p-5 md:p-8 lg:p-11"
          />
        </div>
        <div className={`my-5 text-center text-sm font-semibold ${mutedText}`}>
          <p>Want to see metrics on your recent video?</p>
          <p>Upload and publish a video to get started</p>
        </div>
        <div className="mb-5">
          <button
            className={`${primaryBtn} px-4 py-2 mx-auto block mt-5`}
            onClick={openModal}
          >
            Upload video
          </button>
        </div>
      </div>
    </div>
  );
}

function AnalyticsCard() {
  return (
    <div
      className={`border self-start p-5 rounded-3xl w-full md:w-96 ${borderClass}`}
    >
      <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
        <div className="mb-7">
          <h1 className="text-xl font-medium">Channel analytics</h1>
          <span className="block text-sm mt-2 md:mt-3 lg:mt-4">
            current subscribers
          </span>
          <span className="block text-3xl font-medium">99</span>
        </div>

        <div className="space-y-3">
          <div className="mt-3">
            <h1 className="font-medium">Summary</h1>
            <span className={`text-xs md:text-sm ${mutedText}`}>
              Last 28 days
            </span>
          </div>
          <div className="flex justify-between text-xs md:text-sm">
            <span>Views</span>
            <span>0 -</span>
          </div>
          <div className="flex justify-between text-xs md:text-sm pb-3">
            <span>Watch time (hours)</span>
            <span>0 -</span>
          </div>
        </div>

        <div>
          <div className="mt-3">
            <h1 className="font-medium">Top videos</h1>
            <span className={`text-xs md:text-sm ${mutedText}`}>
              Last 48 hours
            </span>
          </div>
          <div>
            <NavLink
              to="/channel/YourChannelName/studio/analytics"
              className="px-4 py-2 font-medium rounded-full block mt-5 w-max
                         bg-gray-100 hover:bg-gray-200
                         dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              Go to channel analytics
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadVideoModal({ closeModal, isModalOpen }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const uploadProgress = useSelector((state) => state.global.uploadProgress);

  const { onSubmit, isLoading, isError, isSuccess } = useVideo();

  // to reset form on success
  useEffect(() => {
    if (!isLoading && !isError) {
      reset();
    }
  }, [isLoading]);

  if (!isModalOpen) return null;

  const handleClose = () => {
    if (!isLoading) closeModal();
  };

  const labelClass = "mb-0.5 font-medium text-sm md:text-base";

  return (
    <div
      className="modal-overlay flex justify-center items-center fixed inset-0 backdrop-brightness-50 backdrop-blur-sm px-3 z-50"
      onClick={handleClose}
    >
      <div
        className="modal-content w-full md:w-3/4 lg:w-1/2 rounded-3xl
                   bg-white text-neutral-900
                   dark:bg-neutral-900 dark:text-neutral-100 border border-neutral-100 dark:border-neutral-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex justify-between items-center border-b py-3.5 px-5 ${borderClass}`}
        >
          <div className="text-lg md:text-xl lg:text-2xl font-medium">
            Upload video
          </div>
          <button
            onClick={handleClose}
            className={`p-2 rounded-full ${hoverClass}`}
          >
            <RxCross1 className="text-xl" />
          </button>
        </div>

        <div className="relative pt-3 pb-5 px-5 max-h-[32rem] overflow-y-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="space-y-2"
          >
            <div>
              <label
                htmlFor="videoTitle"
                className={`flex items-center gap-x-2 ${labelClass}`}
              >
                <span>Title</span>
                {errors.videoTitle?.type === "required" && (
                  <span className={errorClass}>*video title is required</span>
                )}
              </label>
              <input
                type="text"
                id="videoTitle"
                className={inputClass}
                {...register("videoTitle", { required: true })}
              />
            </div>

            <div>
              <label htmlFor="videoDesc" className={`block ${labelClass}`}>
                Description
              </label>
              <textarea
                rows={3}
                id="videoDesc"
                className={`${inputClass} resize-none`}
                {...register("videoDesc")}
              />
            </div>

            <div>
              <label htmlFor="videoGenre" className={labelClass}>
                Genre
              </label>
              <select
                id="videoGenre"
                className="outline-none border px-2 py-1 text-sm ml-3
                           bg-white text-neutral-900 border-neutral-300 focus:border-blue-600
                           dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700 dark:focus:border-blue-500
                           dark:[color-scheme:dark]"
                defaultValue=""
                {...register("videoGenre")}
              >
                <option value="" hidden disabled>
                  --select--
                </option>
                {genreOptions.map((genre) => (
                  <option key={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="videoTags" className={`block ${labelClass}`}>
                Tags
              </label>
              <input
                type="text"
                id="videoTags"
                className={inputClass}
                {...register("videoTags")}
              />
            </div>

            <div>
              <label
                htmlFor="videoFile"
                className={`flex items-center gap-x-2 ${labelClass}`}
              >
                <span>Video</span>
                {errors.videoFile && (
                  <span className={errorClass}>{errors.videoFile.message}</span>
                )}
              </label>
              <input
                type="file"
                id="videoFile"
                className={fileClass}
                {...register("videoFile", {
                  required: "*video file is required",
                  validate: {
                    maxCount: (files) =>
                      files?.length === 1 || "*only one file is allowed",
                    mimeType: (files) =>
                      files[0]?.type.startsWith("video/") ||
                      "*invalid filetype",
                  },
                })}
              />
            </div>

            <div>
              <label
                htmlFor="videoThumbnail"
                className={`flex items-center gap-x-2 ${labelClass}`}
              >
                <span>Thumbnail</span>
                {errors.videoThumbnail && (
                  <span className={errorClass}>
                    {errors.videoThumbnail.message}
                  </span>
                )}
              </label>
              <input
                type="file"
                id="videoThumbnail"
                className={fileClass}
                {...register("videoThumbnail", {
                  required: false,
                  validate: {
                    maxCount: (files) =>
                      files?.length <= 1 || "*only one file is allowed",
                    mimeType: (files) =>
                      !files.length ||
                      files[0]?.type.startsWith("image/") ||
                      "*invalid filetype",
                  },
                })}
              />
            </div>

            <div>
              <button
                type="submit"
                className={`${primaryBtn} px-6 py-2 mx-auto block mt-5`}
                disabled={isLoading}
              >
                Upload
              </button>
            </div>

            {(isSuccess || isLoading || isError) && (
              <div className="md:absolute md:right-4 md:bottom-5 text-sm tracking-wide text-gray-600 dark:text-neutral-400">
                <span>
                  upload(
                  <span className="text-xs font-medium">
                    <span className="text-black dark:text-white">
                      {uploadProgress < 100 && `${uploadProgress}%`}
                    </span>
                    <span>
                      {uploadProgress === 100 &&
                        isLoading &&
                        !isError &&
                        "Processing..."}
                    </span>
                    <span className="text-green-600 dark:text-green-400">
                      {isSuccess && "Finished"}
                    </span>
                    <span className="text-red-600 dark:text-red-400">
                      {isError && "Failed"}
                    </span>
                  </span>
                  )
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function StudioDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <main className="flex-grow pr-3 md:pr-8 mb-12 text-neutral-900 dark:text-neutral-100">
      <TopActionBar openModal={openModal} />
      <UploadVideoModal closeModal={closeModal} isModalOpen={isModalOpen} />
      <div className="mt-5 flex flex-wrap gap-5">
        <UploadCard openModal={openModal} />
        <AnalyticsCard />
      </div>
    </main>
  );
}

export default StudioDashboardPage;
