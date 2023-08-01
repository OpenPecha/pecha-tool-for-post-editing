import { useEffect, useState, useRef } from "react";
import { cleanUpSymbols } from "~/lib/cleanupText";
import { CopySVG } from "~/style/svg/copy";

function GPTview({
  text,
  mitraText,
  dictionary,
}: {
  text: string | null;
  mitraText: string;
  dictionary: string;
}) {
  const [content, setContent] = useState("");
  const textRef = useRef();

  useEffect(() => {
    if (text && mitraText && dictionary) {
      let prompt = `original text: ${text}, translated text: ${mitraText}`;
      if (dictionary) prompt += `, dictionary: ${dictionary}`;
      prompt += `make translation better with dictionary`;
      let url = `/api/openai`;
      const formData = new FormData();
      formData.append("prompt", prompt);
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setContent(data.result);
        });
    }
  }, [text, mitraText, dictionary]);

  const handleCopy = () => {
    const data = cleanUpSymbols(content);
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      console.log("Text copied to clipboard: " + data);
    }
  };

  return (
    <div className="final-box">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="box-title">Final:</div>
        <div onClick={handleCopy} className="copy_btn">
          <CopySVG />
        </div>
      </div>
      <textarea
        className="box-content"
        ref={textRef}
        style={{ maxWidth: "95%" }}
        value={cleanUpSymbols(content) || "Enter something in Source"}
        readOnly
      />
    </div>
  );
}

export default GPTview;
