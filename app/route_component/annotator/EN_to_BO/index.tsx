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
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeTime,
  finalTextState,
  gptResultState,
  sourceTextState,
} from "./state";
import PromptView from "./component/Prompt";
import { getUser } from "~/model/user";
import { DepartmentType } from "~/model/data/actions";
import { getTextForUser } from "~/model/text";
import { Card, CardDescription } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import ActiveUser from "~/component/ActiveUser";
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session");
  let history = url.searchParams.get("history") || null;
  if (!session) session = "demo";
  let user = await getUser(session);
  if (!user) return redirect("/");
  let department: DepartmentType = "en_bo";
  let text = null;
  if (user.isActive && session !== "demo")
    text = await getTextForUser(user.id, department, history);
  return defer({
    user,
    department,
    text,
    history,
  });
};
export default function EN_to_BO() {
  let { text, user } = useLoaderData();
  const [sourceText, setSourceText] = useRecoilState(sourceTextState);
  const [gptResult] = useRecoilState(gptResultState);
  const [finalText, setFinalText] = useRecoilState(finalTextState);
  const [selectedOption, setSelectedOption] = useState(null);

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
      <Sidebar title="English To Bodyig" />
      <div className="mt-10 top-4 md:top-0 md:pt-1 md:mt-0 w-full  absolute md:relative  overflow-y-auto px-2">
        <div className="flex-1">
          <div className="text-xs">
            {!user.isActive && "❗contact admin to get access on text "}
            {!text && "❗text unavailable"}
          </div>
          <ActiveUser state={activeTime} />

          <TextView
            text={sourceText}
            setMainText={onChangeHandler}
            color="#93c5fd"
          />
          <EditorView text={finalText} />
          <div className="flex gap-2 mt-2">
            <MitraTextView
              text={sourceText}
              onBoxClick={onBoxClick}
              name="mitra1"
              color="#93c5fd"
              selectedOption={selectedOption}
            />
            <MitraTextView
              text={gptResult}
              onBoxClick={onBoxClick}
              name="mitra2"
              color="#86efac"
              selectedOption={selectedOption}
            />
          </div>
          <PromptView />
          <GPTView text={sourceText} color={"#86efac"} />
          <BingView text={sourceText} name="bing1" />
        </div>
      </div>
    </div>
  );
}

function EditorView({ text }: { text: string }) {
  const [value, setValue] = useState(text);
  const { text: loader_text, department, user } = useLoaderData();
  const [duration, setDuration] = useRecoilState(activeTime);
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
        result: cleanUpSymbols(value),
        duration,
        department,
        action: "save_text",
      },
      {
        method: "PATCH",
      }
    );
    setDuration(0);
  }
  const disabled =
    submitResult.state !== "idle" || text?.length < 5 || !loader_text;

  return (
    <Card className="final-box overflow-hidden  ">
      <CardDescription className="flex justify-between bg-yellow-400 px-3">
        Final:
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className="btn-sm bg-green-400 disabled:bg-gray-400"
          >
            submit
          </button>
          <CopyButton textToCopy={cleanUpSymbols(value)} />
        </div>
      </CardDescription>

      <Textarea value={value} onChange={handleInput} rows={4} />
    </Card>
  );
}
