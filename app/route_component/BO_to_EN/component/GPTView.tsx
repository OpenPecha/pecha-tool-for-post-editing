import { useEffect, useState, useRef } from "react";
import CopyButton from "~/component/CopyButton";
import { Loading } from "~/component/Loading";
import { cleanUpSymbols } from "~/lib/cleanupText";

function GPTview({
  text,
  mitraText,
  dictionary,
}: {
  text: string | null;
  mitraText: string;
  dictionary: any;
}) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (text?.length === 0) return setContent("");
    async function fetchdata() {
      setIsLoading(true);
      let prompt = `[paste the result here] ,Edit the following without adding information: ${mitraText} `;
      if (!!dictionary) {
        prompt += `[please use this data for dictionary ${JSON.stringify(
          dictionary
        )} ]`;
      }
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
  }, [text, mitraText, dictionary]);

  return (
    <div className="final-box">
      <div className="flex items-center justify-between bg-yellow-100">
        <div className="box-title px-2">Final:</div>
        <CopyButton textToCopy={cleanUpSymbols(content)} />
      </div>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="box-content" style={{ maxWidth: "95%" }}>
          {cleanUpSymbols(content) || "Enter something in Source"}
        </div>
      )}
    </div>
  );
}

export default GPTview;
