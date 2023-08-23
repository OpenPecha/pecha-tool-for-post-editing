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
    if (text?.length === 0) return setContent("");
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
      <div className="flex items-center justify-between bg-yellow-100">
        <div className="box-title px-2">Final:</div>
        <CopyButton textToCopy={cleanUpSymbols(content)} />
      </div>
      {isLoading && (
        <span className="loading loading-spinner loading-md"></span>
      )}
      {!isLoading && (
        <div className="box-content" style={{ maxWidth: "95%" }}>
          {cleanUpSymbols(content) || "Enter something in Source"}
        </div>
      )}
    </div>
  );
}

export default GPTview;
