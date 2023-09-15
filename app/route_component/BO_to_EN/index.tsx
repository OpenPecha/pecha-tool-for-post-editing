import { LoaderArgs, LoaderFunction, defer, redirect } from "@remix-run/node";
import { Await } from "@remix-run/react";
import GPTview from "~/route_component/BO_to_EN/component/GPTView";
import MitraView from "~/route_component/BO_to_EN/component/MitraTextView";
import Sidebar from "~/component/layout/Sidebar";
import Source from "./component/Source";
import { getUser } from "~/model/user";
import { getTextForUser } from "~/model/text";
import { DepartmentType } from "~/model/data/actions";
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session") as string;
  let history = url.searchParams.get("history") || null;
  if (!session) return redirect("/error");
  let user = await getUser(session);
  let department: DepartmentType = "bo_en";
  if (!user) return redirect("/error");
  let text = await getTextForUser(user.id, department, history);
  console.log(text);
  // if (!text) return redirect("/error");
  return defer({
    user,
    department,
    text,
    history,
  });
};

export default function BO_to_EN() {
  return (
    <div className="flex overflow-hidden h-screen flex-col md:flex-row">
      <Sidebar title="BO->EN" />
      <div className="mt-10 md:mt-2 h-[90vh] overflow-y-scroll w-full absolute md:relative top-4">
        <div className="flex justify-around flex-wrap gap-4 p-2">
          <div className="max-w-[600px] w-full">
            <Source />
            <GPTview />
            <MitraView />
          </div>
        </div>
      </div>
    </div>
  );
}
