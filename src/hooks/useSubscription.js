import { useParams } from "react-router-dom";
import {
  useSubscribeChannelMutation,
  useUnsubscribeChannelMutation,
} from "../api/subscriptionApi";

function useSubscription({ channelName = undefined }) {
  const [
    subscribeChannel,
    {
      isLoading: subscribeIsLoading,
      isSuccess: subscribeIsSuccess,
      isError: subscribeIsError,
    },
  ] = useSubscribeChannelMutation();
  const subscribeOnClick = async (refetch) => {
    try {
      const response = await subscribeChannel({
        channelName,
        accessToken: localStorage.getItem("accessToken"),
      });
      // console.log(response);
      refetch();
    } catch (error) {
      console.log("SUBSCRIBE CHANNEL ERROR:: ", error);
    }
  };

  const [
    unsubscribeChannel,
    {
      isLoading: unsubscribeIsLoading,
      isSuccess: unsubscribeIsSuccess,
      isError: unsubscribeIsError,
    },
  ] = useUnsubscribeChannelMutation();
  const unsubscribeOnClick = async (refetch) => {
    try {
      const response = await unsubscribeChannel({
        channelName,
        accessToken: localStorage.getItem("accessToken"),
      });
      // console.log(response);
      refetch();
    } catch (error) {
      console.log("UNSUBSCRIBE CHANNEL ERROR:: ", error);
    }
  };

  return {
    subscribeOnClick,
    unsubscribeOnClick,
    subscribeState: {
      isLoading: subscribeIsLoading,
      isSuccess: subscribeIsSuccess,
      isError: subscribeIsError,
    },
    unsubscribeState: {
      isLoading: unsubscribeIsLoading,
      isSuccess: unsubscribeIsSuccess,
      isError: unsubscribeIsError,
    },
  };
}

export default useSubscription;
