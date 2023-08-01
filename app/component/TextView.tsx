import { useState } from "react";
import _ from "lodash";

function TextView({
  text = "",
  setMainText,
}: {
  text: string | null;
  setMainText: (data: string | null) => void;
}) {
  const handleTextChange = (e) => {
    const value = e.target.value;
    setMainText(value); // Call the debounced function to update the main text after the delay
  };

  return (
    <div className="container-view">
      <div className="box-title">Source text</div>
      <textarea
        placeholder="enter/paste your text here"
        value={text!}
        onChange={handleTextChange}
      ></textarea>
    </div>
  );
}

export default TextView;
