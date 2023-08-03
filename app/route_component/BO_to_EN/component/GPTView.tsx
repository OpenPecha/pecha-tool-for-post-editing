import { useEffect, useState, useRef } from "react";
import CopyButton from "~/component/CopyButton";
import { cleanUpSymbols } from "~/lib/cleanupText";

function GPTview({
  text,
  mitraText,
  dictionary,
}: {
  text: string | null;
  mitraText: string;
  dictionary: string | null;
}) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      setIsLoading(true);
      let prompt = `${text} , the translated text: ${mitraText}`;
      if (dictionary) prompt += `, dictionary: ${dictionary}`;
      prompt += `only contain english translated text`;
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#eee",
        }}
      >
        <div className="box-title" style={{ paddingInline: 5 }}>
          Final:
        </div>
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
