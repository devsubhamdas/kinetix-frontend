// Bottom Navigation for small devices only, screen size < 768px
import React from "react";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { BsFire } from "react-icons/bs";
import { MdOutlineSubscriptions } from "react-icons/md";
import { useSelector } from "react-redux";

function BottomNav() {
  const username = useSelector((state) => state.auth.user?.username);

  const navItems = [
    { label: "Home", to: "/", icon: IoMdHome },
    { label: "Trending", to: "/", icon: BsFire },
    {
      label: "Studio",
      to: `/channel/${username}/studio`,
      icon: AiOutlineVideoCameraAdd,
      requiresAuth: true,
    },
    {
      label: "Subscriptions",
      to: "/feed/subscriptions",
      icon: MdOutlineSubscriptions,
    },
    { label: "You", to: "/", icon: CiUser },
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
        {visibleItems.map(({ label, to, icon: Icon }) => (
          <li key={label}>
            <Link to={to}>
              <div>
                <Icon className="text-2xl mx-auto" />
                <span>{label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNav;
