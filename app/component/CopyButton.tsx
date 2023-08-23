import React, { useEffect, useState, useRef } from "react";
import { CopySVG } from "~/style/svg/copy";
let timer: NodeJS.Timeout;

function CopyButton({ textToCopy }) {
  const textRef = useRef(null);

  const [showToast, setShowToast] = useState(false);

  const handleCopyClick = () => {
    if (textRef.current) {
      setShowToast(true);
      textRef.current.select();
      document.execCommand("copy");
      console.log("Text copied to clipboard: " + textToCopy);
      // Optional: Remove the text selection after copying
      window.getSelection().removeAllRanges();
    }
  };
  useEffect(() => {
    if (timer) clearTimeout(timer);
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showToast]);

  return (
    <div>
      <button onClick={handleCopyClick} className="">
        <CopySVG />
      </button>
      <span style={{ position: "absolute", left: "-9999px" }}>
        <textarea ref={textRef} value={textToCopy || ""} readOnly />
      </span>
      {showToast && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>Copied</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CopyButton;
