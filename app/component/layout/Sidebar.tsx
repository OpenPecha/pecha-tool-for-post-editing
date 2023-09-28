import { Link, useNavigate, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Hamburger } from "./SVGS";
import { Separator } from "~/components/ui/separator";
import { ScrollArea } from "~/components/ui/scroll-area";

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
      <div className="flex px-2 py-3 items-center justify-between md:hidden ">
        <div>About</div>
        <div className="cursor-pointer p-2" onClick={() => setOpenMenu(false)}>
          x
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col border-r bg-white dark:bg-slate-500 dark:text-white">
      <div
        className=" flex px-2 py-3 text-lg font-semibold items-center  gap-2 "
        onClick={() => setOpenMenu(true)}
      >
        <Hamburger />
        {title}
      </div>
      <div
        className={`flex flex-col bg-white dark:bg-slate-500 dark:text-white  overflow-y-auto overflow-x-hidden max-h-[100vh] transition-all -translate-x-full z-30 ${
          openMenu ? "block translate-x-0" : ""
        } min-h-[100vh] w-[260px] md:translate-x-0`}
      >
        <div className=" flex gap-2 flex-col mb-3  mt-2 ">
          <SidebarHeader />
          {(user.role === "ADMIN" || user.role === "REVIEWER") && (
            <Link
              to={`/admin/user?session=${user.username}`}
              className="inline-flex items-center bg-gray-200 hover:underline  rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start"
            >
              {user.role} Dashboard
            </Link>
          )}
        </div>
        <Separator />

        <div className="mb-2 mt-3 px-4 text-xs tracking-tight flex justify-between ">
          <div>current Task</div>
          <div>ID : {text?.id}</div>
        </div>
        <Separator />
        <div className="flex-1 py-2">
          <div className="relative px-4  tracking-tight">History</div>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              <History list={rejectedlist} type="rejected" />
              <History list={acceptedlist} type="accepted" />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

function History({ list, type }: any) {
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
            className={`cursor-pointer text-sm   px-2 flex gap-3 items-center ${
              history == item.id
                ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
                : ""
            }  ${isRejected && "text-red-500 "}`}
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
