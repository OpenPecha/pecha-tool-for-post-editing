import { User } from "@prisma/client";
import {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction,
  defer,
  json,
  redirect,
} from "@remix-run/node";
import { useEffect, useState } from "react";
import { Outlet, useOutletContext, useRevalidator } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session");
  if (!session) return redirect("/error");

  return null;
};

export const meta: V2_MetaFunction = () => {
  return [
    { title: `Admin page ` },
    {
      name: "description",
      content: `admin page for `,
    },
  ];
};

function Index() {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const user = useOutletContext();

  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 ">
      <div className="col-span-12 xl:col-span-8 "></div>
      <div>hello</div>
    </div>
  );
}

export default Index;
