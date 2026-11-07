import { NavLink, Outlet } from "react-router-dom";
import { FlexContainer } from "../../components";
import { Navbar } from "../../components";
import { MdDashboard } from "react-icons/md";
import { MdOutlineVideoLibrary, MdOutlineCopyright } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
import { RiUserCommunityLine } from "react-icons/ri";
import { FaMagic } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetChannelInfoAndStatsQuery } from "../../api/userApi";

const hoverClass = "hover:bg-gray-200 dark:hover:bg-neutral-700";

function StudioLeftNav() {
  const { user } = useSelector((state) => state.auth);
  const base = `/channel/${user?.username}`;

  const { data: channel } = useGetChannelInfoAndStatsQuery(
    {
      channelName: user?.username,
      accessToken: localStorage.getItem("accessToken"),
    },
    {
      skip: !user,
    }
  );

  const navItems = [
    { label: "Dashboard", to: `${base}/studio`, icon: MdDashboard, end: true },
    {
      label: "Content",
      to: `${base}/studio/content`,
      icon: MdOutlineVideoLibrary,
      end: true,
    },
    { label: "Analytics", to: `${base}/studio/analytics`, icon: IoMdStats },
    {
      label: "Community",
      to: `${base}/studio/community`,
      icon: RiUserCommunityLine,
    },
    {
      label: "Copyright",
      to: `${base}/studio/copyright`,
      icon: MdOutlineCopyright,
    },
    {
      label: "Customization",
      to: `${base}/studio/customization`,
      icon: FaMagic,
    },
  ];

  return (
    <aside>
      <nav className="sticky top-[72px]">
        <div
          className="md:w-[200px] lg:w-[236px] w-max min-h-[calc(100vh-72px)] border shadow-inner
                     bg-white text-neutral-900 border-neutral-200
                     dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700 dark:shadow-none"
        >
          <ul>
            <li>
              <NavLink to={base}>
                <div
                  className={`${hoverClass} flex items-center gap-x-4 md:block px-3 md:px-5 py-2`}
                >
                  <div className="w-9 md:w-24 lg:w-32 md:mx-auto">
                    <img
                      src={
                        channel?.data?.avatar || "/assets/default-avatar.png"
                      }
                      alt=""
                      className="w-full block aspect-square rounded-full object-cover bg-gray-100 dark:bg-neutral-800"
                    />
                  </div>
                  <div className="hidden md:block text-center my-4">
                    <h1 className="text-gray-500 dark:text-neutral-400 font-medium text-sm">
                      {user?.username}
                    </h1>
                  </div>
                </div>
              </NavLink>
            </li>

            {navItems.map(({ label, to, icon: Icon, end }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 dark:text-blue-400 font-medium"
                      : "text-neutral-900 dark:text-neutral-100"
                  }
                >
                  <div
                    className={`${hoverClass} md:flex items-center gap-x-4 px-3 md:px-5 py-2`}
                  >
                    <Icon className="text-2xl" />
                    <span className="text-[0.625rem] md:text-sm lg:text-base">
                      {label}
                    </span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
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
