import { BubbleMenu, EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { editorProps } from "~/lib/tiptapWordSegmentor/events";
import { Character } from "~/lib/tiptapWordSegmentor/extension/character";
import { Space } from "~/lib/tiptapWordSegmentor/extension/space";
import TiptapInner from "./TiptapInner";

const setter = () => {};
const charClick = () => {};
export const extensions = [StarterKit, Space(setter), Character(charClick)];

function TiptapEditor({
  text_content,
  setEdit,
}: {
  text_content: string;
  setEdit: (value: boolean) => void;
}) {
  return (
    <div className="border-2 border-gray-200 shadow-md text-lg">
      <EditorProvider
        slotBefore={<TiptapInner setEdit={setEdit} />}
        extensions={extensions}
        content={text_content}
        editorProps={editorProps}
      >
        {/* <BubbleMenu>This is the bubble menu</BubbleMenu> */}
      </EditorProvider>
    </div>
  );
}

export default TiptapEditor;
