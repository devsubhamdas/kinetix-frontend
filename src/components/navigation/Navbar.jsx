import React, { useState } from "react";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { MdMic } from "react-icons/md";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useSelector } from "react-redux";

function Navbar({ openModal }) {
  const { logoutHandler } = useLogout();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const [searchParams] = useSearchParams();
  const initialTerm = searchParams.get("q") ?? "";

  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    navigate(`/results?q=${encodeURIComponent(term)}`);
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 px-4 sm:px-5 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/">
              {/* Swaps the logo automatically based on the browser theme */}
              <picture>
                <source
                  srcSet="/assets/kinetix-brand-v2/kinetix-logo-dark.png"
                  media="(prefers-color-scheme: dark)"
                />
                <img
                  src="/assets/kinetix-brand-v2/kinetix-logo-light.png"
                  alt="logo"
                  className="w-24 sm:w-28 md:w-32 lg:w-36"
                />
              </picture>
            </Link>
          </div>

          <div className="hidden md:flex gap-x-4 items-center flex-1 md:max-w-96 lg:max-w-xl">
            <form className="w-full" onSubmit={(e) => handleSearch(e)}>
              <div className="flex items-center">
                <input
                  type="text"
                  className="outline-none border rounded-l-full w-full h-10 px-4
                             bg-white text-neutral-900 placeholder:text-neutral-500
                             border-neutral-300 focus:border-blue-600
                             dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-400
                             dark:border-neutral-700 dark:focus:border-blue-500"
                  name="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="w-20 h-10 border border-l-0 rounded-r-full
                             bg-gray-50 hover:bg-gray-100 border-neutral-300
                             dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700"
                >
                  <CiSearch className="cursor-pointer text-2xl mx-auto" />
                </button>
                <button>
                  <IoClose className="text-2xl mx-auto text-neutral-400" />
                </button>
              </div>
            </form>
            <div className="bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 p-2 rounded-full">
              <MdMic className="cursor-pointer text-2xl" />
            </div>
          </div>

          <div className="flex gap-x-2.5 md:gap-x-4 lg:gap-x-6">
            <button className="md:hidden">
              <CiSearch className="cursor-pointer text-2xl" />
            </button>
            <button className="md:hidden">
              <MdMic className="cursor-pointer text-2xl" />
            </button>
            <button className="hidden md:block">
              <AiOutlineVideoCameraAdd className="cursor-pointer text-lg md:text-xl lg:text-2xl" />
            </button>

            {!loginStatus && (
              <button
                className="border rounded-full px-2 py-1 md:px-3 md:py-1.5
                           text-blue-600 hover:bg-blue-100 border-neutral-300
                           dark:text-blue-400 dark:hover:bg-blue-500/10 dark:border-neutral-700"
                onClick={openModal}
              >
                <div className="flex items-center gap-x-1">
                  <CiUser className="inline cursor-pointer text-lg md:text-xl lg:text-2xl" />
                  <span className="text-sm md:text-base font-medium">
                    Sign in
                  </span>
                </div>
              </button>
            )}

            {loginStatus && (
              <button
                className="border rounded-full px-2 py-1 md:px-3 md:py-1.5
                           text-blue-600 hover:bg-blue-100 border-neutral-300
                           dark:text-blue-400 dark:hover:bg-blue-500/10 dark:border-neutral-700"
                onClick={logoutHandler}
              >
                <span className="text-sm md:text-base font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
