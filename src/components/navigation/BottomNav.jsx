// Bottom Navigation for small devices only, screen size < 768px
import React from "react";
import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { MdLocalFireDepartment } from "react-icons/md";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { MdSubscriptions } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";

import { useSelector } from "react-redux";

function BottomNav() {
  const username = useSelector((state) => state.auth.user?.username);

  const navItems = [
    { label: "Home", to: "/", icon: MdOutlineHome, activeIcon: MdHome },
    {
      label: "Trending",
      to: "/feed/trending",
      end: false,
      icon: MdOutlineLocalFireDepartment,
      activeIcon: MdLocalFireDepartment,
    },
    {
      label: "Studio",
      to: `/channel/${username}/studio`,
      icon: AiOutlineVideoCameraAdd,
      requiresAuth: true,
      end: true,
    },
    {
      label: "Subscriptions",
      to: "/feed/subscriptions",
      icon: MdOutlineSubscriptions,
      activeIcon: MdSubscriptions,
      end: true,
    },
    {
      label: "You",
      to: "/you",
      icon: FaRegCircleUser,
      activeIcon: FaCircleUser,
      end: true,
    },
  ];

  const visibleItems = navItems.filter(
    (item) => !item.requiresAuth || username
  );

  return (
    <nav
      className="md:hidden fixed bottom-0 w-full py-2 z-50 border-t
                 bg-white text-neutral-900 border-neutral-200
                 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700"
    >
      <ul className="flex justify-around text-xs text-center">
        {visibleItems.map(({ label, to, end, icon, activeIcon }) => (
          <li key={label}>
            <NavLink to={to} end={end || to === "/"}>
              {({ isActive }) => {
                const Icon = isActive ? activeIcon : icon;
                return (
                  <div
                    className={`${isActive ? "" : "text-gray-700 dark:text-gray-300"}`}
                  >
                    <Icon className="text-2xl mx-auto" />
                    <span className="text-xs">{label}</span>
                  </div>
                );
              }}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNav;
