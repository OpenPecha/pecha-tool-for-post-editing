import React, { useRef } from "react";
import { CopySVG } from "~/style/svg/copy";

function CopyButton({ textToCopy }) {
  const textRef = useRef(null);

  const handleCopyClick = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      console.log("Text copied to clipboard: " + textToCopy);
      // Optional: Remove the text selection after copying
      window.getSelection().removeAllRanges();
    }
  };

  return (
    <div>
      <button onClick={handleCopyClick} className="copy_btn">
        <CopySVG />
      </button>
      <span style={{ position: "absolute", left: "-9999px" }}>
        <textarea ref={textRef} value={textToCopy} readOnly />
      </span>
    </div>
  );
}

export default CopyButton;
