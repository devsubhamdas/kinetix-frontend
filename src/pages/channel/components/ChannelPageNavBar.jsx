import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

function ChannelPageNavBar() {
  const location = useLocation();
  const { username } = useParams();

  const links = [
    {
      name: "Home",
      slug: `/channel/${encodeURIComponent(username)}`,
    },
    {
      name: "Videos",
      slug: `/channel/${encodeURIComponent(username)}/videos`,
    },
    {
      name: "Live",
      slug: `/channel/${encodeURIComponent(username)}/live`,
    },
    {
      name: "Community",
      slug: `/channel/${encodeURIComponent(username)}/community`,
    },
    {
      name: "Playlists",
      slug: `/channel/${encodeURIComponent(username)}/playlists`,
    },
    {
      name: "About",
      slug: `/channel/${encodeURIComponent(username)}/about`,
    },
  ];

  return (
    <div className="sticky top-[72px] mt-5 mx-2.5 lg:mx-0 border-b bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-700">
      <ul className="flex gap-5 lg:gap-x-7 font-semibold overflow-x-auto no-scrollbar text-gray-500 dark:text-neutral-400">
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.slug}
              end
              className={({ isActive }) =>
                isActive
                  ? "block border-b-2 border-b-gray-900 text-black dark:border-b-neutral-100 dark:text-white"
                  : "block hover:border-b-2 hover:border-b-gray-400 dark:hover:border-b-neutral-500"
              }
            >
              <div className="md:py-1 lg:py-2">{link.name}</div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChannelPageNavBar;
