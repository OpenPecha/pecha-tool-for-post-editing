import { LoaderArgs, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Dictionary from "~/route_component/BO_to_EN/component/Dictionary";
import GPTview from "~/route_component/BO_to_EN/component/GPTView";
import MitraView from "~/route_component/BO_to_EN/component/MitraTextView";
import TextView from "~/component/TextView";
import checkUnknown from "~/lib/checkunknown";
import Button from "~/component/Button";
import ActionButtons from "~/component/layout/ActionButtons";
import Sidebar from "~/component/layout/Sidebar";
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session");
  let history = url.searchParams.get("history") || null;
  if (!session) return redirect("/error");

  let text = "ཡང་སྲིད་སྐྱོང་མཆོག་གིས། ";
  return {
    text,
    OPENAI_key: process.env.OPENAI_KEY,
  };
};

export default function BO_to_EN() {
  let data = useLoaderData();
  // let text = checkUnknown(data.text);
  let [mainText, setMainText] = useState(null);
  let [mitraText, setMitraText] = useState("");
  let [dictionary, setDictionary] = useState("");
  return (
    <div className="main">
      <Sidebar user={null} online={[]} />
      <div style={{ overflowY: "scroll", marginTop: 40, width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 20,
            padding: 10,
          }}
        >
          <div style={{ maxWidth: 600, width: "100%" }}>
            <TextView text={mainText} setMainText={setMainText} />
            <GPTview
              text={mainText}
              mitraText={mitraText}
              dictionary={dictionary}
            />
            <MitraView
              text={mainText}
              language="bo-en"
              setContent={setMitraText}
              content={mitraText}
            />
          </div>
          <Dictionary setDictionary={setDictionary} text={mainText} />
          <ActionButtons />
        </div>
      </div>
    </div>
  );
}
