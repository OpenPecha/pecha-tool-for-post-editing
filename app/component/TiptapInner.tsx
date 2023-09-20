import { useCurrentEditor } from "@tiptap/react";
import React, { useEffect } from "react";
import { CardDescription } from "~/components/ui/card";
import insertHTMLonText from "~/lib/insertHtmlOnText";

function TiptapInner({ setDictionaryData }: any) {
  let { editor } = useCurrentEditor();
  const content = editor?.getText();
  useEffect(() => {
    if (editor) {
      const segments = document.querySelectorAll(".seg");
      let clickCount = 0;
      const events = [];
      const handleSegmentClick = (event) => {
        let modifiedContent = content;
        const selection = event.target.innerText;
        const locationText = event.target.classList;
        const spaceToAddLocation =
          parseInt(locationText[1].replace("s-", "")) + selection.length;
        clickCount++;

        setTimeout(() => {
          if (clickCount === 1) {
            // Single click
            if (content[spaceToAddLocation] === " ") {
              modifiedContent =
                modifiedContent.slice(0, spaceToAddLocation) +
                modifiedContent.slice(spaceToAddLocation + 1);
            } else {
              modifiedContent =
                modifiedContent.slice(0, spaceToAddLocation) +
                " " +
                modifiedContent.slice(spaceToAddLocation);
            }
            const newText = insertHTMLonText(modifiedContent);
            editor?.commands.setContent(newText);
          } else if (clickCount === 2) {
            const condition = ["ར་", "ས་", "འི་", "།།", "།", "འང་"];
            const includedCondition = condition.find((cond) =>
              selection.includes(cond)
            );
            const exactCondition = condition.find((cond) => cond === selection);
            if (includedCondition && !exactCondition) {
              const s = selection.split(includedCondition);
              s[1] = " ";
              s[2] = includedCondition;
              const middle = s.join("");
              const start = spaceToAddLocation - selection.length;
              const end =
                spaceToAddLocation - selection.length + selection.length;
              modifiedContent =
                modifiedContent.slice(0, start) +
                middle +
                modifiedContent.slice(end);
              const newText = insertHTMLonText(modifiedContent);
              editor?.commands.setContent(newText);
            } else {
              let middle = selection.slice(0, -1) + " " + selection.slice(-1);
              const start = spaceToAddLocation - selection.length;
              const end =
                spaceToAddLocation - selection.length + selection.length;
              modifiedContent =
                modifiedContent.slice(0, start) +
                middle +
                modifiedContent.slice(end);
              const newText = insertHTMLonText(modifiedContent);
              editor?.commands.setContent(newText);
            }
          }

          setTimeout(() => {
            clickCount = 0;
          }, 300);
        }, 200);
      };

      segments.forEach((segment, i) => {
        const event = {
          segment,
          listener: handleSegmentClick,
        };
        segment.addEventListener("click", event.listener);

        events[i] = event;
      });

      return () => {
        segments.forEach((segment, i) => {
          segment.removeEventListener("click", events[i].listener);
        });
      };
    }
  }, [editor, content]);

  function handleSave() {
    let innerText = editor?.getText();
    let word_array = innerText?.split(" ") ?? [];
    let temp_Data = word_array?.map((word) => ({ word, definition: null }));
    setDictionaryData(temp_Data);
  }

  return (
    <>
      <CardDescription className="box-title flex justify-between text-sm p-1 bg-[#93c5fd] w-full">
        Source text
        <button className="text-sm" onClick={handleSave}>
          save
        </button>
      </CardDescription>
    </>
  );
}

export default TiptapInner;
