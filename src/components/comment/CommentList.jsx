import React, { useState, useRef } from "react";
import { CommentCard } from "../index.js";
import { FiChevronDown } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const sortBtn = `py-0.5 px-3 rounded-md text-sm font-medium
  bg-gray-200 hover:bg-gray-300
  dark:bg-neutral-800 dark:hover:bg-neutral-700`;

function CommentList({ comments }) {
  const [commentPanel, setCommentPanel] = useState(false);
  const commentPanelRef = useRef();
  function toggleCommentPanel() {
    commentPanelRef.current.classList.toggle("hidden");
    setCommentPanel((commentPanel) => !commentPanel);
  }

  return (
    <>
      <div className="flex gap-x-2 items-center my-4 lg:my-3 px-2 text-neutral-900 dark:text-neutral-100">
        <span className="text-base md:text-lg lg:text-xl font-medium">
          {comments?.length} Comments
        </span>
        <button className={sortBtn}>Top</button>
        <button className={sortBtn}>Newest</button>
        <button className="ml-auto md:hidden" onClick={toggleCommentPanel}>
          {commentPanel ? (
            <IoMdClose className="text-xl" />
          ) : (
            <FiChevronDown className="text-xl" />
          )}
        </button>
      </div>

      <div
        ref={commentPanelRef}
        className="hidden md:block px-3 space-y-3 md:space-y-4 lg:space-y-6 mb-5"
      >
        {comments.map((comment) => (
          <CommentCard
            key={comment._id}
            content={comment.content}
            avatar={comment.owner.avatar}
            username={comment.owner.username}
            updatedAt={comment.updatedAt}
            createdAt={comment.createdAt}
          />
        ))}
      </div>
    </>
  );
}

export default CommentList;
