import {
  BubbleMenu,
  EditorContent,
  EditorProvider,
  useCurrentEditor,
} from "@tiptap/react";
import { useEffect, useState } from "react";
import TextView from "~/component/TextView";
import TiptapEditor from "~/component/TiptapEditor";
import insertHTMLonText from "~/lib/insertHtmlOnText";
import { editorProps } from "~/lib/tiptapWordSegmentor/events";
import {
  extensions,
  useEditorTiptap,
} from "~/lib/tiptapWordSegmentor/useEditorTiptap";

type SourceProps = { text: string; setMainText: (text: string) => void };

function Source({ text, setMainText }: SourceProps) {
  let [sourceText, setSourceText] = useState<string>("");
  let [edit, setEdit] = useState<boolean>(true);
  let handleMainTextChange = (value) => {
    setSourceText(value);
    setMainText(value);
  };

  if (edit)
    return (
      <>
        <TextView
          text={sourceText}
          setMainText={handleMainTextChange}
          color="#93c5fd"
        >
          <button onClick={() => setEdit(false)}>save</button>
        </TextView>
      </>
    );
  let text_content = insertHTMLonText(sourceText);
  return <TiptapEditor text_content={text_content} setEdit={setEdit} />;
}

export default Source;
