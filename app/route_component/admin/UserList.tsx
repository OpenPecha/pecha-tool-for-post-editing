import { useState, useEffect } from "react";
import { useLoaderData } from "@remix-run/react";
import { User } from "@prisma/client";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { PersonIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
function UserList({ user, selectedUser, setSelectedUser }: any) {
  let isAdmin = user.role === "ADMIN";
  let { users } = useLoaderData();
  const [search, setSearch] = useState("");
  const [selectedReviewer, setSelectedReviewer] = useState("All");
  function handleReviewerChange(value) {
    setSelectedReviewer(value);
  }
  let reviewers = users.filter((user) => user.role === "REVIEWER");
  let list = users.filter((annotator: User) =>
    annotator.username.includes(search)
  );
  useEffect(() => {
    setSelectedUser(users[0].username);
  }, []);
  if (selectedReviewer !== "All") {
    list = list.filter(
      (user: User & { reviewer: User }) =>
        user?.reviewer?.username === selectedReviewer ||
        user?.username === selectedReviewer
    );
  }
  return (
    <Card className="sticky top-0 col-span-12 rounded-sm border border-stroke bg-white pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <CardHeader className="pb-3">
        <CardTitle>Annotators</CardTitle>
        <CardDescription>
          {/* Choose what you want to be notified about. */}
        </CardDescription>
        <Input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="user search"
          className="h-6 mb-3"
        />
      </CardHeader>
      <CardContent className="grid gap-1">
        {isAdmin && (
          <Select onValueChange={handleReviewerChange}>
            <SelectTrigger className="w-full h-6 mb-3" value={selectedReviewer}>
              <SelectValue placeholder="Select Group" className="text-xs" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs">Select Group</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                {reviewers.map((reviewer: User) => (
                  <SelectItem
                    key={reviewer.id + "-key-selection"}
                    value={reviewer.username}
                  >
                    {reviewer.username}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {list.map((user: any) => (
          <EachUser
            key={user.id + "unique_key"}
            user={user}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
          />
        ))}
      </CardContent>
    </Card>
  );
}

function EachUser({ user, setSelectedUser, selectedUser }) {
  return (
    // <div
    //   onClick={() => setSelectedUser(user.username)}
    //   className={` cursor-pointer flex items-center gap-5  hover:bg-gray-3 dark:hover:bg-meta-4 hover:rounded-sm transition duration-300 ease-in-out hover:bg-green-300 ${
    //     selectedUser === user.username && "bg-green-300"
    //   }`}
    // >
    //   <div className="flex flex-1 items-center justify-between px-2">
    //     <div>
    //       <h5 className="font-medium text-black dark:text-white capitalize">
    //         {user.nickname}{" "}
    //       </h5>
    //     </div>
    //   </div>
    // </div>

    <div
      onClick={() => setSelectedUser(user.username)}
      className={`-mx-2 cursor-pointer flex items-start space-x-4 rounded-md bg-gray-200 p-2 text-accent-foreground transition-all ${
        selectedUser === user.username && "bg-green-300"
      }`}
    >
      <PersonIcon className="mt-px h-5 w-5" />
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{user.nickname}</p>
        <p className="text-[10px] text-muted-foreground">{user.role}</p>
      </div>
    </div>
  );
}

export default UserList;
