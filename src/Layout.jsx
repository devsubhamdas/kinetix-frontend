// import React, { useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import {
//   Navbar,
//   LeftNav,
//   BottomNav,
//   FlexContainer,
//   LoginModal,
// } from "./components";
// import { useSelector, useDispatch } from "react-redux";
// import { openLoginModal, closeLoginModal } from "./features/global/globalSlice";
// import useAuth from "./hooks/useAuth";

// function Layout() {
//   const dispatch = useDispatch();
//   const isLoginModalOpen = useSelector(
//     (state) => state.global.isLoginModalOpen
//   );
//   const currentAuthState = useSelector((state) => state.auth);

//   // try to authenticate on first render
//   const isAuthenticated = useSelector((state) => state.global.isAuthenticated);
//   const { initializeAuth } = useAuth();
//   initializeAuth();

//   if (!isAuthenticated)
//     return (
//       <>
//         <div className="dark:text-white">
//           Authentication in progress, please wait...
//         </div>
//       </>
//     );

//   return (
//     <>
//       <Navbar openModal={() => dispatch(openLoginModal())} />
//       <LoginModal
//         closeModal={() => dispatch(closeLoginModal())}
//         isModalOpen={isLoginModalOpen}
//       />
//       <FlexContainer>
//         {/* LeftNav for large screen only */}
//         <LeftNav />
//         <Outlet />
//       </FlexContainer>
//       {/* BottomNav for small screen only */}
//       <BottomNav />
//     </>
//   );
// }

// export default Layout;

import React from "react";
import { Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  Navbar,
  LeftNav,
  BottomNav,
  FlexContainer,
  LoginModal,
} from "./components";
import { openLoginModal, closeLoginModal } from "./features/global/globalSlice";
import { useInitializeAuth } from "./hooks/useAuth";

function Layout() {
  const dispatch = useDispatch();
  const isLoginModalOpen = useSelector(
    (state) => state.global.isLoginModalOpen
  );
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

  // try to authenticate once on first render
  useInitializeAuth();

  if (!isAuthenticated) {
    return (
      <div className="dark:text-white">
        Authentication in progress, please wait...
      </div>
    );
  }

  return (
    <>
      <Navbar openModal={() => dispatch(openLoginModal())} />
      <LoginModal
        closeModal={() => dispatch(closeLoginModal())}
        isModalOpen={isLoginModalOpen}
      />
      <FlexContainer>
        {/* LeftNav for large screen only */}
        <LeftNav />
        <Outlet />
      </FlexContainer>
      {/* BottomNav for small screen only */}
      <BottomNav />
    </>
  );
}

export default Layout;
