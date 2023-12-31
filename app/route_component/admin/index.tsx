import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import CsvUpload from "~/component/Upload";
import Sidebar from "./Sidebar";
import { getUser } from "~/model/user";
import { useState } from "react";
import Header from "./Header";

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session") as string;
  const user = await getUser(session);

  return { user };
};

export function AdminPage() {
  const { pathname } = useLocation();
  const { user } = useLoaderData();
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <main
            className={`mx-auto max-w-screen-2xl w-full flex-1   ${
              pathname.includes("metabase") ? "p-0" : " p-4 md:p-6 2xl:p-10"
            }`}
          >
            <Outlet context={user} />
          </main>
        </div>
      </div>
    </div>
  );
}
