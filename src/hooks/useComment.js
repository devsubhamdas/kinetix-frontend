import { useAddCommentMutation } from "../api/commentApi.js";

function useComment() {
  const [addComment, { isError, isLoading, isSuccess }] =
    useAddCommentMutation();

  const addCommentOnSubmit = async (data) => {
    try {
      const response = await addComment({
        ...data,
        accessToken: localStorage.getItem("accessToken"),
      });
    } catch (error) {
      console.log("COMMENT ADD ERROR:: ", error);
    }
  };

  return {
    addCommentOnSubmit,
    addCommentState: { isError, isLoading, isSuccess },
  };
}

export default useComment;
