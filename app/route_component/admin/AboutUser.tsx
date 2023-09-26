import { Link, useLoaderData, useFetcher } from "@remix-run/react";
import { User } from "@prisma/client";
import AllowAnnotation from "./AllowAnnotation";
import AssignNickName from "./AssignNickName";
import AssignRole from "./AssignRole";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

function Info({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start px-2 text-lg mt-2">
      {children}
    </div>
  );
}
function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-light mb-2 flex justify-between w-full text-gray-600">
      {children}
    </div>
  );
}

const AboutUser = ({
  selectedUser,
  user,
  removeUser,
}: {
  selectedUser: string;
  user: any;
  removeUser: () => void;
}) => {
  const { users } = useLoaderData();
  const annotator = users.find((user: User) => user?.username === selectedUser);
  const isAdmin = user.role === "ADMIN";
  const en_bo_work = annotator?.accepted_bo?.at(0)?.name;
  const bo_en_work = annotator?.accepted_en?.at(0)?.name;

  if (selectedUser === "") return null;
  if (annotator === undefined) return null;
  return (
    <div className="sticky top-[80px]  rounded-sm border border-stroke bg-white px-5 pt-6 pb-10 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-10 ">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex justify-between items-center capitalize">
            {annotator?.username} details
            <AllowAnnotation annotator={annotator} />
          </CardTitle>
          <CardDescription>{annotator?.role}</CardDescription>
        </CardHeader>
      </Card>
      <CardContent className="grid">
        <Info>
          <Title>Name:</Title>
          <AssignNickName user={annotator} />
        </Info>
        <Info>
          <Title>Role:</Title>
          <AssignRole annotator={annotator} isAdmin={isAdmin} />
        </Info>
        <Info>
          <Title>Woking:</Title>
          {en_bo_work ? (
            <div>en-bo :{annotator?.accepted_bo?.at(0).name}</div>
          ) : null}
          {bo_en_work ? (
            <div>bo-en :{annotator?.accepted_en?.at(0).name}</div>
          ) : null}
        </Info>
        {isAdmin && (
          <Info>
            <div
              onClick={removeUser}
              className="underline text-red-500 cursor-pointer "
            >
              remove user
            </div>
          </Info>
        )}
      </CardContent>
    </div>
  );
};

export default AboutUser;
