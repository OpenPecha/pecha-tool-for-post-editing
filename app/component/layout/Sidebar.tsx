import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import TextInfo from "./TextInfo";
import { Hamburger } from "./SVGS";

export type historyText = {
  id: number;
  reviewed: boolean;
};

function Sidebar({ title }: { title: string }) {
  let [openMenu, setOpenMenu] = useState(false);
  let { user } = useLoaderData();
  function SidebarHeader() {
    return (
      <div className="flex bg-[#384451] px-2 py-3 items-center justify-between md:hidden ">
        <div>About</div>
        <div className="cursor-pointer p-2" onClick={() => setOpenMenu(false)}>
          x
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <div
        className=" flex px-2 py-3 text-white bg-gray-600 text-lg font-semibold items-center  gap-2 "
        onClick={() => setOpenMenu(true)}
      >
        <Hamburger />
        {title}
      </div>
      <div
        className={`flex flex-col text-white bg-[#54606e] overflow-y-auto overflow-x-hidden max-h-[100vh] transition-all -translate-x-full z-30 ${
          openMenu ? "block translate-x-0" : ""
        } min-h-[100vh] w-[260px] md:translate-x-0`}
      >
        <div className=" flex gap-2 flex-col border-b-2 border-b-[#384451] mb-3  mt-2 ">
          <SidebarHeader />
          {(user.role === "ADMIN" || user.role === "REVIEWER") && (
            <Link
              to={`/admin?session=${user.username}`}
              className="hover:opacity-80 hover:bg-gray-800 transition-all duration-75"
            >
              {user.role} Dashboard
            </Link>
          )}
        </div>
        <div className="flex-1">
          <div className="text-sm mb-2 font-bold">History</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
