import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import TextView from "~/component/TextView";
import GPTView from "./component/GPTView";
import BingView from "./component/BingView";
import MitraTextView from "./component/MitraTextView";
import { useEffect, useMemo, useState } from "react";
import ActionButtons from "~/component/layout/ActionButtons";
import Sidebar from "~/component/layout/Sidebar";
import useDebounce from "~/lib/useDebounce";
import CopyButton from "~/component/CopyButton";
import { cleanUpSymbols } from "~/lib/cleanupText";
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session");
  let history = url.searchParams.get("history") || null;
  if (!session) return redirect("/error");

  let text = "my name is tashi , how are you";
  return {
    text,
  };
};

export default function EN_to_BO() {
  // const { text } = useLoaderData();
  const [text, setText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [selectedOption, setSelectedOption] = useState("mitra1");
  function set_gpt1_result(value: string) {
    setSelectedText(value);
  }

  const onBoxClick = ({ name, text }: { name: string; text: string }) => {
    setSelectedOption(name);
    setFinalText(text);
  };
  const [prompt, setPrompt] = useState(" in plain english ");
  const [chatprompt, setChatPrompt] = useState(
    "Rewrite the following text in plain english"
  );
  let debouncedText = useDebounce(text, 1000);
  let debouncedPrompt = useDebounce(chatprompt, 1000);

  function handleChangePrompt(e) {
    setPrompt(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let newPrompt = "Rewrite the following text " + prompt;
    setChatPrompt(newPrompt);
  }
  return (
    <div className="main">
      <Sidebar user={null} online={[]} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 20,
          overflowY: "scroll",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ padding: 10 }}>
          <div style={{ flex: 1 }}>
            <TextView text={text} setMainText={setText} />
            <EditorView text={finalText} />
            <div style={{ display: "flex", gap: 10 }}>
              <div
                className="container-view box-item"
                style={{
                  background: selectedOption !== "mitra1" ? "#eee" : "#eea",
                  flex: 1,
                }}
              >
                <MitraTextView
                  text={debouncedText}
                  language="en-bo"
                  onBoxClick={onBoxClick}
                  name="mitra1"
                />
              </div>
              <div
                className="container-view box-item"
                style={{
                  background: selectedOption !== "mitra2" ? "#eee" : "#eea",
                  flex: 1,
                }}
              >
                <MitraTextView
                  text={selectedText}
                  language="en-bo"
                  onBoxClick={onBoxClick}
                  name="mitra2"
                />
              </div>
            </div>
            <form style={{ marginTop: 10 }} onSubmit={handleSubmit}>
              <label htmlFor="prompt_1">Rewrite the following text ..</label>
              <input
                id="prompt_1"
                value={prompt}
                onChange={handleChangePrompt}
              />
            </form>
            <div style={{ flex: 1 }}>
              <GPTView
                text={debouncedText}
                setContent={set_gpt1_result}
                promptData={debouncedPrompt}
              />
            </div>
            <div
              className="container-view box-item"
              style={{
                background: selectedOption !== "bing1" ? "#eee" : "#eea",
              }}
            >
              <BingView
                text={debouncedText}
                onBoxClick={onBoxClick}
                name="bing1"
              />
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="box-title">Final:</div>
        <CopyButton textToCopy={cleanUpSymbols(text)} />
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        placeholder="type something above"
      />
    </div>
  );
}
