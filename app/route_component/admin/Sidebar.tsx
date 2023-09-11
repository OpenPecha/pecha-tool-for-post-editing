import React, { useRef } from "react";
import { useLocation, useLoaderData, NavLink } from "@remix-run/react";
import { Hamburger } from "~/component/layout/SVGS";
import { BiSolidDashboard } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { AiOutlineFileText } from "react-icons/ai";
import SidebarLinkGroup from "./SidebarLinkGroup";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const sidebar = useRef<any>(null);
  const trigger = useRef<any>(null);
  let { pathname } = useLocation();
  const { user } = useLoaderData();
  let url = "/?session=" + user?.username;
  return (
    <aside
      ref={sidebar}
      className={` absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden text-white bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to={url}>
          <h3 className="mb-2 text-2xl pt-4 font-semibold text-bodydark2 capitalize">
            translator
          </h3>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <Hamburger />
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-2 lg:mt-9 ">
          <div className="text-xl">
            <NavLink
              to={`/admin/metabase?session=${user.username}`}
              className={`group relative flex mb-3 items-center gap-2.5 rounded-sm py-2  font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                pathname.includes("metabase") && "bg-slate-600 dark:bg-meta-4 "
              }`}
            >
              <BiSolidDashboard />
              Dashboard
            </NavLink>
            <h3 className="mb-4 text-sm font-semibold text-gray-400">MENU</h3>

            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 ">
              <li>
                <NavLink
                  to={"/admin/user?session=" + user.username}
                  className={({ isActive }) =>
                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                    (isActive && "!text-white bg-slate-600 dark:bg-meta-4")
                  }
                >
                  <FiUsers /> User
                </NavLink>
              </li>

              <SidebarLinkGroup activeCondition={pathname.includes("en_bo")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/admin/text" ||
                            pathname.includes("text")) &&
                          "bg-gray-700 dark:bg-meta-4"
                        }`}
                        onClick={handleClick}
                      >
                        <AiOutlineFileText />
                        Text
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </div>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to={"/admin/text/en_bo?session=" + user.username}
                              className={({ isActive }) => {
                                return (
                                  "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                  (isActive && "bg-gray-400")
                                );
                              }}
                            >
                              En_Bo
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={"/admin/text/bo_en?session=" + user.username}
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "bg-gray-400")
                              }
                            >
                              Bo_En
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
