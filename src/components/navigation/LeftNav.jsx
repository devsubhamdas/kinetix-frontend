// Left Navigation for medium to large devices only, screen size > 768px
import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import {
  MdOutlineSubscriptions,
  MdOndemandVideo,
  MdOutlineWatchLater,
  MdOutlinePodcasts,
  MdNewspaper,
} from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { RiPlayList2Fill } from "react-icons/ri";
import { GrChannel } from "react-icons/gr";
import { BiLike, BiTrophy } from "react-icons/bi";
import { BsFire, BsBroadcast } from "react-icons/bs";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { RiMovie2Line } from "react-icons/ri";
import { SiYoutubegaming } from "react-icons/si";
import { useSelector } from "react-redux";

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink to={to}>
      <div className="flex items-center gap-x-4 px-5 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-neutral-700">
        <Icon className={`text-2xl`} />
        <span>{label}</span>
      </div>
    </NavLink>
  );
}

function LeftNav() {
  const { loginStatus, accessToken, user } = useSelector((state) => state.auth);
  const isLoggedIn = loginStatus && accessToken && user.id;

  return (
    <aside>
      <nav className="sticky top-[72px]">
        <div
          className="hidden md:block md:w-[200px] lg:w-[236px] divide-y pb-4 ml-3
                     max-h-[calc(100vh-72px)] overflow-y-scroll scrollbar-thin scrollbar-on-hover
                     bg-white text-neutral-900 divide-neutral-200
                     dark:bg-neutral-900 dark:text-neutral-100 dark:divide-neutral-700"
        >
          <div className="flex flex-col pb-3">
            <NavItem to="/" icon={IoMdHome} label="Home" />
            {isLoggedIn && (
              <NavItem
                to={`/channel/${user.username}/studio`}
                icon={AiOutlineVideoCameraAdd}
                label="Studio"
              />
            )}
            <NavItem
              to="/feed/subscriptions"
              icon={MdOutlineSubscriptions}
              label="Subscriptions"
            />
          </div>

          <div className="flex flex-col py-3">
            <span className="text-xl font-semibold px-5">You</span>
            <NavItem to="/feed/history" icon={LuHistory} label="History" />
            <NavItem
              to="/feed/playlist"
              icon={RiPlayList2Fill}
              label="Playlist"
            />
            {isLoggedIn && (
              <NavItem
                to={`/channel/${user.username}`}
                icon={GrChannel}
                label="Your Channel"
              />
            )}
            <NavItem
              to="/channel/YourChannelName/videos"
              icon={MdOndemandVideo}
              label="Your Videos"
            />
            <NavItem
              to="/playlists/watch-later"
              icon={MdOutlineWatchLater}
              label="Watch later"
            />
            <NavItem to="/playlists/" icon={BiLike} label="Liked Videos" />
          </div>

          <div className="flex flex-col py-3">
            <span className="text-xl font-semibold px-5">Explore</span>
            <NavItem to="/" icon={BsFire} label="Trending" />
            <NavItem to="/" icon={IoMusicalNotesOutline} label="Music" />
            <NavItem to="/" icon={RiMovie2Line} label="Movies" />
            <NavItem to="/" icon={BsBroadcast} label="Live" />
            <NavItem to="/" icon={SiYoutubegaming} label="Gaming" />
            <NavItem to="/" icon={BiTrophy} label="Sports" />
            <NavItem to="/" icon={MdNewspaper} label="News" />
            <NavItem to="/" icon={MdOutlinePodcasts} label="Podcasts" />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default LeftNav;
