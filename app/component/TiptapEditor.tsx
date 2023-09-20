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
import { Card } from "~/components/ui/card";
const setter = () => {};
const charClick = () => {};

export const extensions = [StarterKit, Space(setter), Character(charClick)];

function TiptapEditor({
  sourceText,
  setEdit,
}: {
  sourceText: string;
  setEdit: (value: boolean) => void;
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
    <Card className="overflow-hidden">
      {dictionaryData.length > 0 ? (
        <DictionaryView data={dictionaryData} />
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
    </Card>
  );
}

export default TiptapEditor;
