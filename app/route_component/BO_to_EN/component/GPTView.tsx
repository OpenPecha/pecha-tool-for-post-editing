import { useEffect, useState, useRef } from "react";
import CopyButton from "~/component/CopyButton";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      setIsLoading(true);
      let prompt = `original text: ${text}, translated text: ${mitraText}`;
      if (dictionary) prompt += `, dictionary: ${dictionary}`;
      prompt += `make translation better from bo to en`;
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
          setIsLoading(false);
        });
    }
    if (text && mitraText && dictionary) fetchdata();
  }, [text, mitraText, dictionary]);

  return (
    <div className="final-box">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="box-title">Final:</div>
        <CopyButton textToCopy={cleanUpSymbols(content)} />
      </div>
      {isLoading && <div className="loader">Loading</div>}
      {!isLoading && (
        <div className="box-content" style={{ maxWidth: "95%" }}>
          {cleanUpSymbols(content) || "Enter something in Source"}
        </div>
      )}
    </div>
  );
}

export default GPTview;
