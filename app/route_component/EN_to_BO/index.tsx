import { LoaderArgs, LoaderFunction, defer, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import TextView from "~/component/TextView";
import GPTView from "./component/GPTView";
import BingView from "./component/BingView";
import MitraTextView from "./component/MitraTextView";
import { useEffect, useState } from "react";
import Sidebar from "~/component/layout/Sidebar";
import CopyButton from "~/component/CopyButton";
import { cleanUpSymbols } from "~/lib/cleanupText";
import { useRecoilState } from "recoil";
import { finalTextState, gptResultState, sourceTextState } from "./state";
import PromptView from "./component/Prompt";
import { getUser } from "~/model/user";
import { DepartmentType } from "~/model/data/actions";
import { getTextForUser } from "~/model/text";
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session");
  let history = url.searchParams.get("history") || null;
  if (!session) return redirect("/");
  let user = await getUser(session);
  if (!user) return redirect("/");
  let department: DepartmentType = "en_bo";
  let text = await getTextForUser(user.id, department, history);
  return defer({
    user,
    department,
    text,
    history,
  });
};

export default function EN_to_BO() {
  let { text } = useLoaderData();
  const [sourceText, setSourceText] = useRecoilState(sourceTextState);
  const [gptResult] = useRecoilState(gptResultState);
  const [finalText, setFinalText] = useRecoilState(finalTextState);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (text) {
      setSourceText(text.original_text);
      setFinalText("");
    }
  }, [text]);
  const onBoxClick = ({ name, text }: { name: string; text: string }) => {
    setSelectedOption(name);
    setFinalText(text);
  };

  const onChangeHandler = (value: string) => {
    setSourceText(value);
    setFinalText("");
  };
  return (
    <div className="flex overflow-hidden h-screen flex-col md:flex-row">
      <Sidebar title="EN->BO" />
      <div className="mt-10 md:pt-1 md:mt-0 w-full h-[90dvh] absolute md:relative top-4 overflow-y-scroll">
        <div className="p-2">
          <div className="flex-1">
            <TextView
              text={sourceText}
              setMainText={onChangeHandler}
              color="#93c5fd"
            />
            <EditorView text={finalText} />
            <div className="flex gap-2">
              <div
                className="overflow-hidden mt-2 border-2 border-gray-400 shadow-sm flex-1 box-item"
                style={{
                  background: selectedOption === "mitra1" ? "#eea" : "#eee",
                }}
              >
                <MitraTextView
                  text={sourceText}
                  language="en-bo"
                  onBoxClick={onBoxClick}
                  name="mitra1"
                  color="#93c5fd"
                />
              </div>
              <div
                className="overflow-hidden mt-2 border-2 border-gray-400 shadow-sm  box-item flex-1"
                style={{
                  background: selectedOption === "mitra2" ? "#eea" : "#eee",
                }}
              >
                <MitraTextView
                  text={gptResult}
                  language="en-bo"
                  onBoxClick={onBoxClick}
                  name="mitra2"
                  color="#86efac"
                />
              </div>
            </div>
            <PromptView />
            <div className="flex-1">
              <GPTView text={sourceText} color={"#86efac"} />
            </div>
            <div className="overflow-hidden mt-2 border-2 border-gray-400 shadow-sm box-item">
              <BingView text={sourceText} name="bing1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorView({ text }: { text: string }) {
  const [value, setValue] = useState(text);
  const { text: loader_text, department, user } = useLoaderData();

  const handleInput = (e) => {
    const newText = e.target.value;
    setValue(newText);
  };
  useEffect(() => {
    setValue(text);
  }, [text]);
  const submitResult = useFetcher();

  function handleSubmit() {
    submitResult.submit(
      {
        id: loader_text.id,
        user_id: user.id,
        result: cleanUpSymbols(text),
        department,
        action: "save_text",
      },
      {
        method: "PATCH",
        action: "/api/text",
      }
    );
  }
  const disabled = submitResult.state !== "idle" || text.length < 5;

  return (
    <div className="final-box">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#eea",
        }}
      >
        <div className="box-title p-1">Final:</div>
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className="btn-sm bg-green-400 disabled:bg-gray-400"
        >
          submit
        </button>
      </div>
      <textarea value={value} onChange={handleInput} rows={4} />
    </div>
  );
}
