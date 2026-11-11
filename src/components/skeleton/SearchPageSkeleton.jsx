import React from "react";

// works on light and dark backgrounds (dark: needs Tailwind's dark variant enabled)
const Bone = ({ className = "" }) => (
  <div className={`bg-gray-200 dark:bg-white/10 ${className}`} />
);

function VideoCardSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 w-full">
      {/* thumbnail (16:9) + duration badge */}
      <div className="relative w-full sm:w-64 md:w-72 lg:w-[360px] xl:w-[420px] shrink-0">
        <Bone className="w-full aspect-video rounded-xl" />
        <Bone className="absolute bottom-2 right-2 h-5 w-12 rounded !bg-gray-300 dark:!bg-white/20" />
      </div>

      {/* text block */}
      <div className="flex-1 min-w-0 flex gap-3 px-3 sm:px-0">
        <div className="flex-1 min-w-0">
          {/* avatar + title */}
          <div className="flex items-center gap-3">
            <Bone className="size-8 sm:size-9 rounded-full shrink-0" />
            <Bone className="h-5 sm:h-6 w-2/3 sm:w-1/2 rounded" />
          </div>

          {/* channel name */}
          <Bone className="h-4 w-20 sm:w-24 rounded mt-3" />

          {/* views · time */}
          <Bone className="h-3.5 w-36 sm:w-44 rounded mt-3" />

          {/* description (hidden on very small screens) */}
          <Bone className="hidden sm:block h-3.5 w-3/4 rounded mt-3" />
          <Bone className="hidden lg:block h-3.5 w-1/2 rounded mt-2" />
        </div>

        {/* three-dot menu */}
        <Bone className="w-1.5 h-5 rounded-full shrink-0 mt-1" />
      </div>
    </div>
  );
}

function SearchPageSkeleton({ count = 6 }) {
  return (
    <div
      className="animate-pulse w-full max-w-[1800px] mx-auto space-y-5 sm:space-y-4 md:space-y-5 sm:px-4 py-4"
      role="status"
      aria-busy="true"
      aria-label="Loading videos"
    >
      {Array.from({ length: count }).map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
}
export default SearchPageSkeleton;
