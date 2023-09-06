import { useState } from "react";
import TextView from "~/component/TextView";
import TiptapEditor from "~/component/TiptapEditor";

type SourceProps = {
  text: string;
  setMainText: (text: string) => void;
  setDictionary: (text: {}) => void;
};

function Source({ text, setMainText, setDictionary }: SourceProps) {
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
        <TiptapEditor
          sourceText={sourceText}
          setEdit={setEdit}
          setDictionary={setDictionary}
        />
      )}
    </>
  );
}

export default Source;
