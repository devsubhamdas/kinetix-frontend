// import {
//   useValidateAccessTokenMutation,
//   useRefreshAccessTokenMutation,
// } from "../api/userApi.js";
// import { useDispatch, useSelector } from "react-redux";
// import { authUser, unauthUser } from "../features/auth/authSlice.js";
// import {
//   authenticationPending,
//   authenticationCompleted,
// } from "../features/global/globalSlice.js";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// function useAuth() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const authState = useSelector((state) => state.auth);

//   const [validateAccessToken] = useValidateAccessTokenMutation();
//   const [refreshAccessToken] = useRefreshAccessTokenMutation();

//   const autoLogout = () => {
//     dispatch(unauthUser());
//     navigate("/");
//     throw new Error("AUTO LOGOUT:: Please log-in again");
//   };

//   const renewAccessTokenOrAutoLogout = async () => {
//     try {
//       // if accessToken is valid, do nothing
//       await validateAccessToken(localStorage.getItem("accessToken")).unwrap();
//     } catch (error) {
//       try {
//         // if accessToken is invalid, try to genereate new one with the refreshToken
//         const refreshAccessTokenResponse = await refreshAccessToken(
//           localStorage.getItem("refreshToken")
//         ).unwrap();
//         const { accessToken, refreshToken } = refreshAccessTokenResponse.data;
//         dispatch(authUser({ ...authState, accessToken, refreshToken }));
//       } catch (error) {
//         // if refreshToken is also invalid, auto-logout
//         autoLogout();
//       }
//     }
//   };

//   // check authentication
//   const initializeAuth = () => {
//     const { loginStatus, user, accessToken } = useSelector(
//       (state) => state.auth
//     );
//     useEffect(() => {
//       const checkAuth = async () => {
//         dispatch(authenticationPending());
//         try {
//           await renewAccessTokenOrAutoLogout();
//         } catch (error) {
//           console.log("INITIALIZE AUTH ERROR:: ", error.message);
//         }
//         dispatch(authenticationCompleted());
//       };

//       if (loginStatus || user?.id || accessToken) {
//         checkAuth();
//       }
//     }, []);
//   };

//   return { initializeAuth, renewAccessTokenOrAutoLogout, autoLogout };
// }

// export default useAuth;

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  useValidateAccessTokenMutation,
  useRefreshAccessTokenMutation,
} from "../api/userApi.js";
import { authUser, unauthUser } from "../features/auth/authSlice.js";
import {
  authenticationPending,
  authenticationCompleted,
} from "../features/global/globalSlice.js";

function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const [validateAccessToken] = useValidateAccessTokenMutation();
  const [refreshAccessToken] = useRefreshAccessTokenMutation();

  const autoLogout = () => {
    dispatch(unauthUser());
    navigate("/");
    throw new Error("AUTO LOGOUT:: Please log-in again");
  };

  const renewAccessTokenOrAutoLogout = async () => {
    try {
      // if accessToken is valid, do nothing
      await validateAccessToken(localStorage.getItem("accessToken")).unwrap();
    } catch (error) {
      try {
        // if accessToken is invalid, try to generate a new one with the refreshToken
        const refreshAccessTokenResponse = await refreshAccessToken(
          localStorage.getItem("refreshToken")
        ).unwrap();
        const { accessToken, refreshToken } = refreshAccessTokenResponse.data;
        dispatch(authUser({ ...authState, accessToken, refreshToken }));
      } catch (error) {
        // if refreshToken is also invalid, auto-logout
        autoLogout();
      }
    }
  };

  return { renewAccessTokenOrAutoLogout, autoLogout };
}

/**
 * Runs the initial authentication check once, on mount.
 * Always dispatches `authenticationCompleted()` so the app never gets stuck
 * on the "Authentication in progress" screen (including for logged-out users).
 */
export function useInitializeAuth() {
  const dispatch = useDispatch();
  const { loginStatus, user, accessToken } = useSelector((state) => state.auth);
  const { renewAccessTokenOrAutoLogout } = useAuth();

  // Guards against React.StrictMode running the effect twice in development,
  // which would call the token refresh twice (bad for rotating refresh tokens).
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const checkAuth = async () => {
      dispatch(authenticationPending());
      try {
        await renewAccessTokenOrAutoLogout();
      } catch (error) {
        console.log("INITIALIZE AUTH ERROR:: ", error.message);
      } finally {
        dispatch(authenticationCompleted());
      }
    };

    if (loginStatus || user?.id || accessToken) {
      checkAuth();
    } else {
      // Visitor with no stored session: nothing to verify, finish immediately.
      dispatch(authenticationCompleted());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useAuth;
