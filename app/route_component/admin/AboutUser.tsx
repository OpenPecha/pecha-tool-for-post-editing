import { Link, useLoaderData } from "@remix-run/react";
import { User } from "@prisma/client";
import AllowAnnotation from "./AllowAnnotation";
import AssignNickName from "./AssignNickName";
import AssignRole from "./AssignRole";

function Info({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start px-2 text-lg mt-2">
      {children}
    </div>
  );
}
function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-light  flex justify-between w-full">
      {children}
    </div>
  );
}

const AboutUser = ({
  selectedUser,
  user,
}: {
  selectedUser: string;
  user: any;
}) => {
  const { users } = useLoaderData();
  const annotator = users.find((user: User) => user?.username === selectedUser);
  const isAdmin = user.role === "ADMIN";
  let url = `/admin/user/review/${selectedUser}?session=` + user.username;
  if (selectedUser === "") return null;
  return (
    <div className="sticky top-[80px]  rounded-sm border border-stroke bg-white px-5 pt-6 pb-10 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-10 ">
      <div className="flex flex-col md:flex-row justify-between px-1">
        <h4 className="mb-6 text-lg font-semibold text-black dark:text-white capitalize">
          {annotator?.username}
        </h4>
        <AllowAnnotation annotator={annotator} />
      </div>
      <Info>
        <Title>Name:</Title>
        <AssignNickName user={annotator} />
      </Info>
      <Info>
        <Title>Role</Title>
        <AssignRole annotator={annotator} isAdmin={isAdmin} />
      </Info>

      <Link
        title="visit"
        className="bg-green-500 text-white font-bold py-1 px-3 w-full  text-center hover:opacity-90 absolute bottom-0 left-0 right-0 "
        to={url}
      >
        Visit
      </Link>
    </div>
  );
};

export default AboutUser;
