import {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction,
  redirect,
} from "@remix-run/node";
import { useState } from "react";
import { useFetcher, useOutletContext } from "@remix-run/react";
import {
  getUsers,
  removeUser,
  updateUserAssign,
  updateUserNickname,
  updateUserRole,
} from "~/model/user";
import UserList from "~/route_component/admin/UserList";
import AboutUser from "~/route_component/admin/AboutUser";
import { Role } from "@prisma/client";

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session");
  if (!session) return redirect("/error");
  let users = await getUsers();
  return {
    users,
  };
};
export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let nickname = formdata.get("nickname") as string;
  let id = formdata.get("id") as string;
  let allow = formdata.get("allow") as string;
  let action = formdata.get("action") as string;

  switch (action) {
    case "change_nickname": {
      return await updateUserNickname(id, nickname);
    }
    case "change_allow_assign": {
      return await updateUserAssign(id, allow === "true");
    }
    case "change_role": {
      let role = formdata.get("role") as Role;
      return await updateUserRole(id, role);
    }
    case "remove_user": {
      if (request.method === "DELETE") {
        let username = formdata.get("username") as string;
        return await removeUser(username);
      }
    }
  }

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
  let fetcher = useFetcher();

  function removeUser() {
    if (window.confirm("Are you sure you want to remove this user ?")) {
      fetcher.submit(
        {
          username: selectedUser,
          action: "remove_user",
        },
        {
          method: "DELETE",
        }
      );
    }
  }
  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 ">
      <div className="col-span-12 xl:col-span-8 ">
        <AboutUser
          selectedUser={selectedUser}
          user={user}
          removeUser={removeUser}
        />
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
