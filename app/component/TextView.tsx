import { useRef, useState } from "react";
import _ from "lodash";

function TextView({
  text = "",
  setMainText,
  color,
}: {
  text: string | null;
  setMainText: (data: string | null) => void;
  color: string | null;
}) {
  const handleTextChange = (e) => {
    const value = e.target.value;
    setMainText(value); // Call the debounced function to update the main text after the delay
  };
  const textAreaRef = useRef(null);
  function adjustTextAreaHeight() {
    textAreaRef.current.style.height = "auto"; // Reset the height to auto before calculating the new height
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"; // Set the new height to match the content
  }
  return (
    <div className="container-view">
      <div
        className="box-title"
        style={{ padding: 5, backgroundColor: color!, width: "100%" }}
      >
        Source text
      </div>
      <textarea
        style={{ resize: "vertical", fontSize: 18, background: "white" }}
        placeholder="enter/paste your text here"
        value={text! || ""}
        rows={4}
        onChange={handleTextChange}
        ref={textAreaRef}
        onInput={adjustTextAreaHeight}
      ></textarea>
    </div>
  );
}

export default TextView;
