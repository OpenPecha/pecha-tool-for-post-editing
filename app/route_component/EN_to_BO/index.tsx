import { LoaderArgs, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import TextView from "~/component/TextView";
import GPTView from "./component/GPTView";
import BingView from "./component/BingView";
import MitraTextView from "./component/MitraTextView";
import { useEffect, useMemo, useRef, useState } from "react";
import ActionButtons from "~/component/layout/ActionButtons";
import Sidebar from "~/component/layout/Sidebar";
import useDebounce from "~/lib/useDebounce";
import CopyButton from "~/component/CopyButton";
import { cleanUpSymbols } from "~/lib/cleanupText";
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session");
  if (!session) return redirect("/error");

  let text = "my name is tashi , how are you";
  return {
    text,
  };
};

export default function EN_to_BO() {
  // const { text } = useLoaderData();
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  function set_gpt1_result(value: string) {
    setSelectedText(value);
  }

  const onBoxClick = ({ name, text }: { name: string; text: string }) => {
    setSelectedOption(name);
    setFinalText(text);
  };
  const prompt_start = "Rewrite the following text";
  const [prompt, setPrompt] = useState(" in plain english ");
  const [chatprompt, setChatPrompt] = useState(`${prompt_start} ${prompt}`);
  let debouncedText = useDebounce(text, 1000);
  let debouncedSelectedText = useDebounce(selectedText, 3000);
  let debouncedPrompt = useDebounce(chatprompt, 1000);

  function handleChangePrompt(e) {
    setPrompt(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let newPrompt = "Rewrite the following text " + prompt;
    setChatPrompt(newPrompt);
  }
  function adjustInputWidth() {
    const content = inputRef.current?.value;
    const contentLength = content?.length;
    const minWidth = 50; // Optional: You can set your desired minimum width
    // Calculate the width based on content length (you can adjust this formula as needed)
    const newWidth = Math.max(contentLength! * 8, minWidth);
    if (inputRef.current) {
      inputRef.current.style.width = newWidth + "px";
    }
  }
  const onChangeHandler = (value: string) => {
    setText(value);
    setFinalText("");
  };
  return (
    <div className="flex overflow-hidden h-screen flex-col md:flex-row">
      <Sidebar user={null} title="EN->BO" />
      <div className="mt-10 md:pt-1 md:mt-0 w-full h-[90dvh] absolute md:relative top-4 overflow-y-scroll">
        <div className="p-2">
          <div className="flex-1">
            <TextView
              text={text}
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
                  text={debouncedText}
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
                  text={debouncedSelectedText}
                  language="en-bo"
                  onBoxClick={onBoxClick}
                  name="mitra2"
                  color="#86efac"
                />
              </div>
            </div>
            <form className="mt-2" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-2 mt-2 items-center">
                <img src="/asset/ChatGPT.png" width={20} height={20} />
                <label
                  htmlFor="prompt_1"
                  className="w-auto md:w-[440px]"
                  style={{ fontSize: "clamp(15px,2vw,20px)" }}
                >
                  {prompt_start}{" "}
                </label>
                <input
                  ref={inputRef}
                  id="prompt_1"
                  value={prompt}
                  onChange={handleChangePrompt}
                  className="w-full border border-gray-300 rounded-md p-2"
                  onInput={adjustInputWidth}
                />
                <button
                  type="submit"
                  disabled={prompt.length < 1}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Enter
                </button>
              </div>
            </form>
            <div className="flex-1">
              <GPTView
                text={debouncedText}
                setContent={set_gpt1_result}
                promptData={debouncedPrompt}
                color={"#86efac"}
              />
            </div>
            <div className="overflow-hidden mt-2 border-2 border-gray-400 shadow-sm box-item">
              <BingView text={debouncedText} name="bing1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorView({ text }: { text: string }) {
  const [value, setValue] = useState(text);
  useEffect(() => {
    setValue(text);
  }, [text]);
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
        <CopyButton textToCopy={cleanUpSymbols(value)} />
      </div>
      <div contentEditable={true} className="p-2">
        {value}
      </div>
    </div>
  );
}
