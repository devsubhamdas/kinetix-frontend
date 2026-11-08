import { useLoginUserMutation } from "../api/userApi.js";
import { useDispatch } from "react-redux";
import { authUser } from "../features/auth/authSlice.js";

function useLogin() {
  const dispatch = useDispatch();
  const [loginUser, { isError, error, isLoading, data }] =
    useLoginUserMutation();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      if (!response.error) {
        // console.log("User login successfull: ", response);
        dispatch(
          authUser({
            loginStatus: true,
            user: {
              id: response.data.user._id,
              username: response.data.user.username,
            },
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
      }
      if (response.error) {
        throw new Error(response.error.status);
      }
    } catch (error) {
      console.log("LOGIN ERROR:: ", error);
    }
  };

  return { onSubmit, isError, error, isLoading, data };
}

export default useLogin;
