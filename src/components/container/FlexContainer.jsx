import React from "react";

function FlexContainer({
  children,
  className = "",
  gapX = "md:gap-x-3",
  gapY = "gap-y-0",
  ...props
}) {
  return (
    <>
      <div
        className={`flex bg-white dark:bg-neutral-900 ${gapX} ${gapY} ${className}`}
        {...props}
      >
        {children}
      </div>
    </>
  );
}

export default FlexContainer;
