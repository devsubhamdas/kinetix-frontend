import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FlexContainer } from "../../components";
import { Navbar } from "../../components";
import { MdDashboard } from "react-icons/md";
import { MdOutlineVideoLibrary, MdOutlineCopyright } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
import { RiUserCommunityLine } from "react-icons/ri";
import { FaMagic } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetChannelInfoAndStatsQuery } from "../../api/userApi";

function StudioLeftNav() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const {
    data: channel,
    isLoading: channelLoading,
    refetch,
  } = useGetChannelInfoAndStatsQuery({
    channelName: user?.username,
    accessToken: localStorage.getItem("accessToken"),
  });

  return (
    <>
      <aside className="">
        <nav className="sticky top-[72px]">
          <div className="md:w-[200px] lg:w-[236px] border shadow-inner w-max min-h-[calc(100vh-72px)]">
            <ul className="">
              <li>
                <NavLink to={`/channel/${user?.username}`}>
                  <div className="flex items-center gap-x-4 md:block px-3 md:px-5 py-2 hover:bg-gray-200">
                    <div className="w-9 md:w-24 lg:w-32 md:mx-auto">
                      <img
                        src={
                          channel?.data?.avatar || "/temp/default-avatar.png"
                        }
                        alt=""
                        className="w-full block aspect-square rounded-full object-cover"
                      />
                    </div>
                    <div className="hidden md:block text-center my-4">
                      <span className="font-semibold text-sm">{}</span>
                      <h1 className="text-gray-500 font-medium text-sm">
                        {user?.username}
                      </h1>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/channel/${user?.username}/studio`}
                  className={(isActive) =>
                    isActive &&
                    location.pathname === `/channel/${user?.username}/studio`
                      ? "text-blue-600 font-medium"
                      : "text-black"
                  }
                  end
                >
                  <div className="md:flex items-center gap-x-4 px-3 md:px-5 py-2 hover:bg-gray-200">
                    <MdDashboard className="text-2xl" />
                    <span className={`text-[0.625rem] md:text-sm lg:text-base`}>
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/channel/${user?.username}/studio/content`}
                  className={(isActive) =>
                    isActive &&
                    location.pathname ===
                      `/channel/${user?.username}/studio/content`
                      ? "text-blue-600 font-medium"
                      : "text-black"
                  }
                  end
                >
                  <div className="md:flex items-center gap-x-4 px-3 md:px-5 py-2 hover:bg-slate-200">
                    <MdOutlineVideoLibrary className="text-2xl" />
                    <span className="text-[0.625rem] md:text-sm lg:text-base">
                      Content
                    </span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={`/channel/${user?.username}/studio/analytics`}>
                  <div className="md:flex items-center gap-x-4 px-3 md:px-5 py-2 hover:bg-slate-200">
                    <IoMdStats className="text-2xl" />
                    <span className="text-[0.625rem] md:text-sm lg:text-base">
                      Analytics
                    </span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={`/channel/${user?.username}/studio/community`}>
                  <div className="md:flex items-center gap-x-4 px-3 md:px-5 py-2 hover:bg-slate-200">
                    <RiUserCommunityLine className="text-2xl" />
                    <span className="text-[0.625rem] md:text-sm lg:text-base">
                      Community
                    </span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={`/channel/${user?.username}/studio/copyright`}>
                  <div className="md:flex items-center gap-x-4 px-3 md:px-5 py-2 hover:bg-slate-200">
                    <MdOutlineCopyright className="text-2xl" />
                    <span className="text-[0.625rem] md:text-sm lg:text-base">
                      Copyright
                    </span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={`/channel/${user?.username}/studio/customization`}>
                  <div className="md:flex items-center gap-x-4 px-3 md:px-5 py-2 hover:bg-slate-200">
                    <FaMagic className="text-2xl" />
                    <span className="text-[0.625rem] md:text-sm lg:text-base">
                      Customization
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}

function StudioLayout() {
  return (
    <>
      <Navbar />
      <FlexContainer gapX="gap-x-3 md:gap-x-8">
        <StudioLeftNav />
        <Outlet />
      </FlexContainer>
    </>
  );
}

export default StudioLayout;
