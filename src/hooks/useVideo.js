import { useParams } from "react-router-dom";
import { useUploadVideoMutation } from "../api/videoApi";
import { useSelector } from "react-redux";

function useVideo() {
  const [uploadVideo, { isError, isLoading, isSuccess, data, error }] =
    useUploadVideoMutation();
  const { username } = useParams();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const onSubmit = async (data) => {
    // convert to formdata for uploading
    const formData = new FormData();

    for (const key in data) {
      if (key === "videoFile") {
        formData.append(key, data[key][0]);
      } else if (key === "videoThumbnail") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    // console.log(data);

    // api call to upload video
    try {
      const response = await uploadVideo({
        username,
        data: formData,
        accessToken,
      }).unwrap();
      // console.log(response);
    } catch (error) {
      console.log("VIDEO UPLOAD ERROR:: ", error);
    }
  };

  return { onSubmit, isLoading, isError, isSuccess, data, error };
}

export default useVideo;
