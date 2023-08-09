import { LoaderArgs, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Dictionary from "~/route_component/BO_to_EN/component/Dictionary";
import GPTview from "~/route_component/BO_to_EN/component/GPTView";
import MitraView from "~/route_component/BO_to_EN/component/MitraTextView";
import TextView from "~/component/TextView";
import Sidebar from "~/component/layout/Sidebar";
import useDebounce from "~/lib/useDebounce";
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session");
  let history = url.searchParams.get("history") || null;
  if (!session) return redirect("/error");

  let text = "ཡང་སྲིད་སྐྱོང་མཆོག་གིས། ";
  return {
    text,
  };
};

export default function BO_to_EN() {
  // let text = checkUnknown(data.text);
  let [mainText, setMainText] = useState(null);
  let [mitraText, setMitraText] = useState("");
  // let [dictionary, setDictionary] = useState(null);
  let debouncedText = useDebounce(mainText, 1000);

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
            <GPTview text={debouncedText} mitraText={mitraText} />
            <MitraView
              text={debouncedText}
              language="bo-en"
              setContent={setMitraText}
              content={mitraText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
