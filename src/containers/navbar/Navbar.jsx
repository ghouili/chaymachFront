import { useLocation } from "react-router-dom";

import { BiHomeAlt2 } from "react-icons/bi";
import { GoBell } from "react-icons/go";
import { FaRegComment, FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { GrMoney } from "react-icons/gr";
import { CiViewTable } from "react-icons/ci";
import { PiFilesLight } from "react-icons/pi";
import { useState } from "react";
import Cookies from "universal-cookie";

const Navbar = () => {
  const cookies = new Cookies();
  const location = useLocation();

  const user = cookies.get("userId");
  const [menu, setMenu] = useState(false);

  const ToggleMenu = () => setMenu(!menu);

  const iconConfigH = {
    color: "#202020",
    size: "1.2em",
    style: { strokeWidth: "0.2" },
  };
  const iconConfigl = {
    // color: "#202020",
    size: "1.2em",
    style: { strokeWidth: "4" },
  };

  const routeLabels = {
    "/": "Dashboard",
    "/users": "Users",
    "/rubrics": "Rubriques",
    "/budgets": "Budgets",
    "/demandes": "Demandes",
  };

  const routeIcons = {
    "/": <BiHomeAlt2 {...iconConfigH} />,
    "/users": <FaRegUser {...iconConfigH} />,
    "/rubrics": <CiViewTable {...iconConfigH} />,
    "/budgets": <GrMoney {...iconConfigH} />,
    "/demandes": <PiFilesLight {...iconConfigH} />,
  };

  const currentRoute = location.pathname;
  const currentLabel = routeLabels[currentRoute] || "Unknown";

  const currentIcon = routeIcons[currentRoute] || (
    <BiHomeAlt2 {...iconConfigH} />
  );

  return (
    <div className="h-14 fixed top-4 right-0 left-64 z-10 px-6">
      <div className="bg-white h-full rounded-md shadow-md flex flex-row items-center justify-between pl-6 pr-4 text-black ">
        <div className="flex flex-row items-center w-1/2">
          <div className="flex flex-row gap-2 items-center transition-transform duration-500 ease-in-out transform">
            {currentIcon}
            <span className="text-sm font-medium ">{currentLabel}</span>
          </div>

          <form className="pl-16">
            <label
              htmlFor="search"
              className=" text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                <svg
                  className="w-3 h-3 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-56 p-1.5 ps-7 text-xs text-gray-900 shadow-sm rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Trouver un patient ou un rapport"
                required
              />
            </div>
          </form>
        </div>
        <div className="w-1/3 pl-6 flex flex-row items-center justify-between ">
          <div className="flex flex-row items-center gap-4">
            <GoBell {...iconConfigH} />
            <FaRegComment {...iconConfigH} />
          </div>
          <button
            onClick={ToggleMenu}
            className="relative flex flex-row gap-2 items-center text-xs"
          >
            <img
              className="w-8 h-8 rounded-full"
              src={
                user
                  ? `http://127.0.0.1:8000/images/${user?.avatar}`
                  : `http://127.0.0.1:8000/images/avatar.png`
              }
              alt="Rounded avatar"
            />
            <div className="flex flex-col">
              <span className="font-semibold">
                {user?.lastName} {user?.firstName}
              </span>
              <span className="font-medium text-[#33B0C4]">{user?.role}</span>
            </div>
            <div>
              <IoIosArrowDown color="#202020" size={18} />
            </div>
            {!menu ? null : (
              <div className="absolute top-10 lef-0 w-32  bg-white shadow border ">
                <button
                  onClick={() => {
                    cookies.remove("userId");
                    cookies.remove("token");
                    window.location.reload();
                  }}
                  className="w-full py-2 flex flex-row items-center justify-center gap-2 text-base font-medium text-red-800 rounded-md hover:text-white hover:bg-red-700 transform ease-in-out duration-300 "
                >
                  <span>logout</span>
                  <IoIosLogOut {...iconConfigl} />
                </button>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
