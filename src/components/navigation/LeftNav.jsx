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

function LeftNav() {
  const { loginStatus, accessToken, user } = useSelector((state) => state.auth);

  return (
    <>
      <aside>
        <nav className="sticky top-[72px]">
          <div className="hidden md:block md:w-[200px] lg:w-[236px] divide-y pb-4 ml-3 max-h-[calc(100vh-72px)] overflow-y-scroll scrollbar-thin scrollbar-on-hover">
            <div className="flex flex-col pb-3">
              <NavLink to={"/"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <IoMdHome className="text-2xl" />
                  <span className="">Home</span>
                </div>
              </NavLink>
              {loginStatus && accessToken && user.id && (
                <NavLink to={`/channel/${user.username}/studio`}>
                  <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                    <AiOutlineVideoCameraAdd className="text-2xl" />
                    <span>Studio</span>
                  </div>
                </NavLink>
              )}
              <NavLink to={"/feed/subscriptions"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <MdOutlineSubscriptions className="text-2xl" />
                  <span>Subscriptions</span>
                </div>
              </NavLink>
            </div>
            <div className="flex flex-col py-3">
              <span className="text-xl font-semibold px-5">You</span>
              <NavLink to={"/feed/history"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <LuHistory className="text-2xl" />
                  <span>History</span>
                </div>
              </NavLink>
              <NavLink to={"/feed/playlist"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <RiPlayList2Fill className="text-2xl" />
                  <span>Playlist</span>
                </div>
              </NavLink>
              {loginStatus && accessToken && user.id && (
                <NavLink to={`/channel/${user.username}`}>
                  <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                    <GrChannel className="text-2xl" />
                    <span>Your Channel</span>
                  </div>
                </NavLink>
              )}
              <NavLink to={"/channel/YourChannelName/videos"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <MdOndemandVideo className="text-2xl" />
                  <span>Your Videos</span>
                </div>
              </NavLink>
              <NavLink to={"/playlists/watch-later"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <MdOutlineWatchLater className="text-2xl" />
                  <span>Watch later</span>
                </div>
              </NavLink>
              <NavLink to={"/playlists/"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <BiLike className="text-2xl" />
                  <span>Liked Videos</span>
                </div>
              </NavLink>
            </div>
            <div className="flex flex-col py-3">
              <span className="text-xl font-semibold px-5">Explore</span>
              <NavLink to={"/"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <BsFire className="text-2xl" />
                  <span>Trending</span>
                </div>
              </NavLink>
              <NavLink to={"/"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <IoMusicalNotesOutline className="text-2xl" />
                  <span>Music</span>
                </div>
              </NavLink>
              <NavLink to={"/"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <RiMovie2Line className="text-2xl" />
                  <span>Movies</span>
                </div>
              </NavLink>
              <NavLink to={"/"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <BsBroadcast className="text-2xl" />
                  <span>Live</span>
                </div>
              </NavLink>
              <NavLink to={"/"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <SiYoutubegaming className="text-2xl" />
                  <span>Gaming</span>
                </div>
              </NavLink>
              <NavLink to={"/"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <BiTrophy className="text-2xl" />
                  <span>Sports</span>
                </div>
              </NavLink>
              <NavLink to={"/"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <MdNewspaper className="text-2xl" />
                  <span>News</span>
                </div>
              </NavLink>
              <NavLink to={"/"}>
                <div className="flex items-center gap-x-4 px-5 py-2 hover:bg-slate-200 rounded-lg">
                  <MdOutlinePodcasts className="text-2xl" />
                  <span>Podcasts</span>
                </div>
              </NavLink>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default LeftNav;
