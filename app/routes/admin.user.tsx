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
import { Outlet, useOutletContext, useLoaderData } from "@remix-run/react";
import { getUser, getUsers } from "~/model/user";
import UserList from "~/route_component/admin/UserList";
import AboutUser from "~/route_component/admin/AboutUser";

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session");
  if (!session) return redirect("/error");
  let users = await getUsers();
  return {
    users,
  };
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
      <div className="col-span-12 xl:col-span-8 ">
        <AboutUser selectedUser={selectedUser} user={user} />
      </div>
      <UserList
        user={user}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}

export default Index;
