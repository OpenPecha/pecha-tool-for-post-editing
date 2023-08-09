import { useEffect, useState, useRef } from "react";
import CopyButton from "~/component/CopyButton";
import { cleanUpSymbols } from "~/lib/cleanupText";

function GPTview({
  text,
  mitraText,
}: {
  text: string | null;
  mitraText: string;
}) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      setIsLoading(true);
      let prompt = `Edit the following without adding information: ${mitraText} `;
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
    if (text && mitraText) fetchdata();
  }, [text, mitraText]);

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
