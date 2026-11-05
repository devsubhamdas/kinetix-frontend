import React from "react";

const Bone = ({ className = "" }) => (
  <div className={`bg-gray-200 dark:bg-neutral-700 ${className}`} />
);

function ChannelPageSkeleton() {
  return (
    <main
      className="w-full animate-pulse"
      role="status"
      aria-busy="true"
      aria-label="Loading channel"
    >
      {/* banner: ~3.5:1 on mobile, flatter on wider screens */}
      <Bone className="w-full aspect-[7/2] md:aspect-[6/1] lg:aspect-[15/2]" />

      {/* avatar + channel info */}
      <div className="flex items-start gap-4 md:gap-10 px-3 md:px-2 mt-4 md:mt-10">
        <Bone className="size-20 sm:size-28 md:size-36 lg:size-44 rounded-full shrink-0" />

        <div className="flex-1 min-w-0 pt-1 md:pt-3">
          {/* channel name */}
          <Bone className="h-7 sm:h-8 md:h-10 w-40 sm:w-52 md:w-72 rounded" />

          {/* @handle · subscribers · videos
              stacked on mobile, single line from md up */}
          <div className="mt-3 space-y-2 md:space-y-0 md:flex md:items-center md:gap-3">
            <Bone className="h-4 w-28 md:w-32 rounded" />
            <Bone className="h-4 w-32 md:w-36 rounded" />
          </div>

          {/* subscribe button */}
          <Bone className="h-10 md:h-11 w-28 md:w-32 rounded-full mt-4" />
        </div>
      </div>

      {/* tabs: Home Videos Live Community Playlists About */}
      <div className="mt-6 md:mt-8 px-3 md:px-2">
        <div className="flex items-center gap-6 md:gap-8 pb-3 overflow-hidden border-b border-neutral-200 dark:border-neutral-700">
          <Bone className="h-5 w-12 rounded shrink-0" />
          <Bone className="h-5 w-14 rounded shrink-0" />
          <Bone className="h-5 w-10 rounded shrink-0" />
          <Bone className="h-5 w-20 rounded shrink-0" />
          <Bone className="h-5 w-16 rounded shrink-0" />
          <Bone className="h-5 w-12 rounded shrink-0" />
        </div>
      </div>

      {/* tab content placeholder (the <Outlet /> area) */}
      <div className="px-3 md:px-2 mt-4 grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Bone className="h-24 w-48 rounded-lg" />
            <div className="flex-grow">
              <Bone className="w-full max-w-80 h-6 rounded-md mb-2" />
              <Bone className="w-full max-w-64 h-6 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ChannelPageSkeleton;
