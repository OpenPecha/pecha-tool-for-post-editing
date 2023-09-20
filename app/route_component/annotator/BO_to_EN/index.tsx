import { LoaderArgs, LoaderFunction, defer, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import GPTview from "~/route_component/annotator/BO_to_EN/component/GPTView";
import MitraView from "~/route_component/annotator/BO_to_EN/component/MitraTextView";
import Sidebar from "~/component/layout/Sidebar";
import Source from "./component/Source";
import { getUser } from "~/model/user";
import { getTextForUser } from "~/model/text";
import { DepartmentType } from "~/model/data/actions";
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session") as string;
  let history = url.searchParams.get("history") || null;
  if (!session) session = "demo";
  let user = await getUser(session);
  let department: DepartmentType = "bo_en";
  if (!user) return redirect("/error");
  let text = null;
  if (user.isActive) text = await getTextForUser(user.id, department, history);
  if (session === "demo") text = null;
  return defer({
    user,
    department,
    text,
    history,
  });
};

export default function BO_to_EN() {
  let { user, text } = useLoaderData();

  return (
    <div className="flex overflow-hidden h-screen flex-col md:flex-row">
      <Sidebar title="Bodyig To English" />
      <div className="mt-10 md:mt-2 h-[90vh] overflow-y-scroll w-full absolute md:relative top-4">
        <div className="flex justify-around flex-wrap gap-4 p-2">
          <div className="max-w-[600px] w-full">
            {!user.isActive && (
              <div className="mb-2">❗ contact admin to get access on text</div>
            )}
            {!text && <div className="mb-2">❗ text unavailable</div>}
            <Source />
            <GPTview />
            <MitraView />
          </div>
        </div>
      </div>
    </div>
  );
}
