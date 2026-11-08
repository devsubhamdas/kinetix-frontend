import React from "react";

// base block: every skeleton piece uses this so the colour stays consistent
const Bone = ({ className = "" }) => (
  <div className={`bg-gray-200 dark:bg-neutral-800 ${className}`} />
);

// surface for boxes (description, add-comment) that sit behind their own bones
const boxClass = "bg-gray-100 dark:bg-neutral-800";
// bones inside those boxes need to override Bone's default colour
const boxBone = "!bg-gray-200 dark:!bg-neutral-800";

/* VIDEO SECTION (player + title + channel row + actions + description)       */
/* Put this inside <VideoSection> in place of the real content                */

export function VideoSectionSkeleton() {
  return (
    <div
      className="animate-pulse w-full ml-0 md:ml-4"
      role="status"
      aria-busy="true"
      aria-label="Loading video"
    >
      {/* player: 16:9, full-bleed on mobile, rounded from md up */}
      <Bone className="w-full aspect-video md:rounded-2xl" />

      <div className="px-4 md:px-0">
        {/* title */}
        <Bone className="h-6 md:h-7 w-3/4 rounded mt-3" />

        {/* channel row */}
        <div className="flex items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <Bone className="size-11 md:size-12 rounded-full shrink-0" />
            <div className="space-y-2">
              <Bone className="h-4 w-28 md:w-36 rounded" />
              <Bone className="h-3 w-20 md:w-24 rounded" />
            </div>
          </div>
          <Bone className="h-10 w-24 md:w-28 rounded-full shrink-0" />
        </div>

        {/* social actions: scrolls sideways on small screens, so clip it */}
        <div className="flex items-center gap-2 md:gap-3 mt-4 overflow-hidden">
          <Bone className="h-10 w-28 md:w-32 rounded-full shrink-0" />
          <Bone className="h-10 w-24 md:w-28 rounded-full shrink-0" />
          <Bone className="h-10 w-20 md:w-24 rounded-full shrink-0" />
          <Bone className="h-10 w-24 md:w-28 rounded-full shrink-0" />
        </div>

        {/* description box */}
        <div className={`${boxClass} rounded-2xl p-4 mt-4 space-y-3`}>
          <Bone className={`h-4 w-40 rounded ${boxBone}`} />
          <Bone className={`h-4 w-24 rounded ${boxBone}`} />
        </div>
      </div>
    </div>
  );
}

/* COMMENT SECTION (add-comment box, count + chips, comment rows)             */
/* Put this inside <CommentSection> while comments are loading                */

function CommentRowSkeleton() {
  return (
    <div className="flex gap-3 md:gap-4">
      <Bone className="size-9 md:size-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Bone className="h-3.5 w-32 rounded" />
        <Bone className="h-3.5 w-full rounded" />
        <Bone className="h-3.5 w-2/3 rounded" />
        <div className="flex gap-3 pt-1">
          <Bone className="h-4 w-10 rounded" />
          <Bone className="h-4 w-10 rounded" />
          <Bone className="h-4 w-12 rounded" />
        </div>
      </div>
    </div>
  );
}

export function CommentSectionSkeleton({ rows = 4 }) {
  return (
    <div
      className="animate-pulse w-full ml-0 md:ml-4"
      role="status"
      aria-busy="true"
      aria-label="Loading comments"
    >
      {/* add comment box */}
      <div
        className={`${boxClass} rounded-2xl p-4 flex items-center gap-3 md:gap-4`}
      >
        <Bone
          className={`size-10 md:size-12 rounded-full shrink-0 ${boxBone}`}
        />
        <Bone className={`h-10 md:h-11 flex-1 rounded-full ${boxBone}`} />
      </div>

      {/* "0 Comments" + Top / Newest chips + sort chevron */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-2 md:gap-3">
          <Bone className="h-6 w-28 md:w-32 rounded" />
          <Bone className="h-8 w-14 rounded-full" />
          <Bone className="h-8 w-20 rounded-full" />
        </div>
        <Bone className="size-5 rounded" />
      </div>

      {/* comment rows */}
      <div className="space-y-6 mt-6">
        {Array.from({ length: rows }).map((_, i) => (
          <CommentRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/* RECOMMENDED VIDEOS (horizontal "flex" cards, matches cardType="flex")      */
/* Put this inside <RecommendVideoSection>                                    */

function RecommendCardSkeleton() {
  return (
    <div className="flex gap-3">
      {/* thumbnail: 16:9, narrower on tablet where the column is tight */}
      <Bone className="aspect-video w-40 sm:w-44 md:w-36 lg:w-44 xl:w-52 rounded-xl shrink-0" />

      <div className="flex-1 min-w-0 space-y-2 pt-1">
        <Bone className="h-4 w-11/12 rounded" />
        <Bone className="h-4 w-2/3 rounded" />
        <Bone className="h-3 w-1/2 rounded mt-2" />
      </div>

      {/* three-dot menu */}
      <Bone className="w-1.5 h-5 rounded-full shrink-0 mt-1" />
    </div>
  );
}

export function RecommendVideoSectionSkeleton({ count = 8 }) {
  return (
    <div
      className="animate-pulse w-full space-y-3 md:space-y-4 px-4 md:px-0 mt-4 md:mt-0"
      role="status"
      aria-busy="true"
      aria-label="Loading recommended videos"
    >
      {Array.from({ length: count }).map((_, i) => (
        <RecommendCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* FULL PAGE (use for the "Authentication in progress" state or first load)   */
export function WatchPageSkeleton() {
  return (
    <>
      <div className="mb-4">
        <Bone className="h-12 md:h-14 lg:h-16 animate-pulse" />
      </div>
      <div className="max-w-[1800px] lg:mx-auto mb-5 md:mb-9 lg:mb-16 dark:bg-neutral-900">
        <div className="flex flex-col md:flex-row sm:gap-x-4 md:gap-x-7 lg:gap-x-10">
          <div className="flex-1 min-w-0">
            <VideoSectionSkeleton />
            <div className="mt-4">
              <CommentSectionSkeleton />
            </div>
          </div>
          <div className="md:w-[340px] lg:w-[400px] xl:w-[440px] shrink-0">
            <RecommendVideoSectionSkeleton />
          </div>
        </div>
      </div>
    </>
  );
}
