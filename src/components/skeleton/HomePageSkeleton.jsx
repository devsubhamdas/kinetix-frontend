import React from "react";

const HomePageSkeleton = () => {
  const count = 20;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-44 animate-pulse bg-gray-100 rounded-xl"
        ></div>
      ))}
    </>
  );
};

export default HomePageSkeleton;
