import { Link, useNavigate, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Hamburger } from "./SVGS";

export type historyText = {
  id: number;
  reviewed: boolean;
};

function Sidebar({ title }: { title: string }) {
  let [openMenu, setOpenMenu] = useState(false);
  let { user, department, text } = useLoaderData();
  let rejectedlist =
    department === "bo_en" ? user.rejected_en : user.rejected_bo;
  let acceptedlist =
    department === "en_bo" ? user.accepted_bo : user.accepted_en;

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
              to={`/admin/user?session=${user.username}`}
              className="bg-gray-400 hover:opacity-80 hover:bg-gray-800 transition-all duration-75"
            >
              {user.role} Dashboard
            </Link>
          )}
        </div>
        <div>text:{text?.id}</div>
        <div className="flex-1">
          <div className="text-sm mb-2 font-bold">History</div>
          <div className="flex gap-3 flex-wrap mx-2">
            <History list={rejectedlist} type="rejected" />
            <History list={acceptedlist} type="accepted" />
          </div>
        </div>
      </div>
    </div>
  );
}

function History({ list, type }) {
  let { user, department, history } = useLoaderData();
  let navigate = useNavigate();
  let isRejected = type === "rejected";
  function handleGoto(url: string) {
    navigate(url);
  }
  return (
    <>
      {list?.map((item) => {
        let url = `/${department}?session=${user.username}&history=${item.id}`;

        return (
          <span
            onClick={() => handleGoto(url)}
            className={`cursor-pointer  px-2 flex gap-3 items-center ${
              history == item.id ? "bg-gray-700" : ""
            }  ${isRejected && "text-red-500"}`}
            key={item.id + "history"}
          >
            {item.id}
          </span>
        );
      })}
    </>
  );
}

export default Sidebar;
