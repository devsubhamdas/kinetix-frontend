import React from "react";

function GridContainer({
  children,
  colWidth = "16.75rem",
  rowGap = ".75rem",
  columnGap = ".75rem",
}) {
  console.log(colWidth, rowGap, columnGap);
  return (
    <>
      <div
        className={`grid mx-3 md:mx-0 md:mr-3`}
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${colWidth}, 1fr))`,
          rowGap: rowGap || ".75rem",
          columnGap: columnGap || ".75rem",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default GridContainer;
