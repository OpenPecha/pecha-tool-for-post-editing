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
  const [gptOutput, setgptOutput] = useState({ 1: "", 2: "" });
  const [selectedBox, setSelectedBox] = useState(1);
  const [selectedText, setSelectedText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [selectedOption, setSelectedOption] = useState("bing1");
  function set_gpt1_result(value: string) {
    setgptOutput({ ...gptOutput, 1: value });
    setSelectedBox(1);
  }
  function set_gpt2_result(value: string) {
    setgptOutput({ ...gptOutput, 2: value });
    setSelectedBox(2);
  }
  useEffect(() => {
    setSelectedText(gptOutput[selectedBox]);
  }, [selectedBox]);

  const onBoxClick = ({ name, text }: { name: string; text: string }) => {
    setSelectedOption(name);
    setFinalText(text);
  };
  let debouncedText = useDebounce(text, 1000);

  return (
    <div className="main">
      <Sidebar user={null} online={[]} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          overflowY: "scroll",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ flex: 1 }}>
          <TextView text={text} setMainText={setText} />
          <GPTView
            text={debouncedText}
            formal={true}
            setContent={set_gpt1_result}
            isSelected={selectedBox === 1}
          />
          <GPTView
            text={debouncedText}
            formal={false}
            setContent={set_gpt2_result}
            isSelected={selectedBox === 2}
          />
          <EditorView text={finalText} />
        </div>
        <div style={{ flex: 1 }}>
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
          <div
            className="container-view box-item"
            style={{
              background: selectedOption !== "mitra1" ? "#eee" : "#eea",
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
              background: selectedOption !== "bing2" ? "#eee" : "#eea",
            }}
          >
            <BingView
              text={selectedText}
              onBoxClick={onBoxClick}
              name="bing2"
            />
          </div>
          <div
            className="container-view box-item"
            style={{
              background: selectedOption !== "mitra2" ? "#eee" : "#eea",
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
      <div className="box-title">final text</div>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
