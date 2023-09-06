import { BubbleMenu, EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { editorProps } from "~/lib/tiptapWordSegmentor/events";
import { Character } from "~/lib/tiptapWordSegmentor/extension/character";
import { Space } from "~/lib/tiptapWordSegmentor/extension/space";
import TiptapInner from "./TiptapInner";
import { useEffect, useState } from "react";
import { tokenizer } from "~/lib/tokenizer";
import insertHTMLonText from "~/lib/insertHtmlOnText";
import DictionaryView, { Dictionary } from "./DictionaryView";
const setter = () => {};
const charClick = () => {};

export const extensions = [StarterKit, Space(setter), Character(charClick)];

function TiptapEditor({
  sourceText,
  setEdit,
  setDictionary,
}: {
  sourceText: string;
  setEdit: (value: boolean) => void;
  setDictionary: (data: {}) => void;
}) {
  let [content, setContent] = useState<string | null>(null);
  let [loading, setLoading] = useState<boolean>(false);
  let [dictionaryData, setDictionaryData] = useState<Dictionary[]>([]);
  useEffect(() => {
    async function load() {
      setLoading(true);
      let data = await tokenizer(sourceText);
      let temp = data.map(({ form }) => form).join(" ");
      setContent(temp);
    }
    load();
    setLoading(false);
  }, [sourceText]);

  if (!content) return null;
  let text_content = insertHTMLonText(content);

  return (
    <div className="border-2 border-gray-200 shadow-md text-lg">
      {dictionaryData.length > 0 ? (
        <DictionaryView data={dictionaryData} setDictionary={setDictionary} />
      ) : (
        <EditorProvider
          slotBefore={<TiptapInner setDictionaryData={setDictionaryData} />}
          extensions={extensions}
          content={text_content}
          editorProps={editorProps}
        >
          {/* <BubbleMenu>This is the bubble menu</BubbleMenu> */}
        </EditorProvider>
      )}
    </div>
  );
}

export default TiptapEditor;
