// import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { BiHomeAlt2 } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { CiViewTable } from "react-icons/ci";
import { PiFilesLight } from "react-icons/pi";
// import { PiFiles } from "react-icons/pi";

import Logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const iconConfigT = {
    size: "1.5em",
    style: { strokeWidth: "0.8" },
  };
  const iconConfigH = {
    size: "1.5em",
    style: { strokeWidth: "0.2" },
  };

  return (
    <div className="bg-white h-full w-64 pl-4 pr-6 fixed top-0 left-0 overflow-y-auto shadow-sm">
      <div className="h-full pb-6 flex flex-col justify-between">
        <div className="">
          <div className="w-full px-10 py-6">
            <img src={Logo} alt="logo" className="w-full h-auto" />
            {/* <h1 className="text-xl text-gray-800 self-center text-center">LOGO</h1> */}
          </div>
          <div className="flex flex-col gap-3 items-center mt-4 text-[#8D8989]">
            {/* Dashboard */}
            <Link
              to="/"
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition-all ease-in-out duration-500 ${
                ["/"].includes(location.pathname)
                  ? "bg-gray-800 text-white"
                  : "text-[#8D8989]"
              }`}
            >
              <BiHomeAlt2 {...iconConfigH} />
              <span className="text-base font-semibold">Dashboard</span>
            </Link>

            {/* Users */}
            <Link
              to="/users"
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition-all ease-in-out duration-500 ${
                ["/users"].includes(location.pathname)
                  ? "bg-gray-800 text-white"
                  : "text-[#8D8989]"
              }`}
            >
              <FaRegUser {...iconConfigH} />
              <span className="text-base font-semibold">Users</span>
            </Link>

            {/* Rubric */}
            <Link
              to="/rubrics"
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition-all ease-in-out duration-500 ${
                ["/rubrics"].includes(location.pathname)
                  ? "bg-gray-800 text-white"
                  : "text-[#8D8989]"
              }`}
            >
              <CiViewTable {...iconConfigT} />
              <span className="text-base font-semibold">Rubriques</span>
            </Link>

            {/* Budget */}
            <Link
              to="/budgets"
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition-all ease-in-out duration-500 ${
                ["/budgets"].includes(location.pathname)
                  ? "bg-gray-800 text-white"
                  : "text-[#8D8989]"
              }`}
            >
              <GrMoney {...iconConfigH} />
              <span className="text-base font-semibold">Busgets</span>
            </Link>

            {/* Demandes */}
            <Link
              to="/demandes"
              className={`w-full flex flex-row rounded-md gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition-all ease-in-out duration-500 ${
                ["/demandes"].includes(location.pathname)
                  ? "bg-gray-800 text-white"
                  : "text-[#8D8989]"
              }`}
            >
              <PiFilesLight {...iconConfigH} />
              <span className="text-base font-semibold">Demandes</span>
            </Link>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <footer className="text-xs font-medium text-gray-600">
            &copy; Copyright 2024 -----
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
