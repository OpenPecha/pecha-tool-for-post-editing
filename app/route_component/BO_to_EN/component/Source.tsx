import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import TextView from "~/component/TextView";
import TiptapEditor from "~/component/TiptapEditor";
import { mainTextState } from "../state";
import { useLoaderData } from "@remix-run/react";
type SourceProps = {};

function Source({}: SourceProps) {
  let { text } = useLoaderData();
  let [, setMainText] = useRecoilState(mainTextState);

  useEffect(() => {
    setMainText(text.original_text);
    setSourceText(text.original_text);
  }, [text]);

  let [sourceText, setSourceText] = useState<string>("");
  let [edit, setEdit] = useState<boolean>(true);
  let handleMainTextChange = (value) => {
    setSourceText(value);
    setMainText(value);
  };
  return (
    <>
      <div className="tabs">
        <button
          type="button"
          onClick={() => setEdit(true)}
          className={`tab tab-sm tab-lifted ${edit && "tab-active"}`}
        >
          Source
        </button>
        <button
          type="button"
          disabled={sourceText === ""}
          className={`tab tab-sm tab-lifted ${!edit && "tab-active"}`}
          onClick={() => setEdit(false)}
        >
          Dictionary
        </button>
      </div>
      {edit ? (
        <TextView
          text={sourceText}
          setMainText={handleMainTextChange}
          color="#93c5fd"
        ></TextView>
      ) : (
        <TiptapEditor sourceText={sourceText} setEdit={setEdit} />
      )}
    </>
  );
}

export default Source;
