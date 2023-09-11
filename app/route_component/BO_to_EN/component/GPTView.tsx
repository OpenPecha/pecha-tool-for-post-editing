import { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import CopyButton from "~/component/CopyButton";
import { Loading } from "~/component/Loading";
import { cleanUpSymbols } from "~/lib/cleanupText";
import { dictionaryState, mitraTextState } from "../state";
import useDebounce from "~/lib/useDebounce";

function GPTview() {
  let data = useRecoilValue(mitraTextState);
  let dictionary_data = useRecoilValue(dictionaryState);
  let mitraText = useDebounce(data, 1000);
  let dictionary = useDebounce(dictionary_data, 1000);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
    if (mitraText) fetchdata();
  }, [mitraText, dictionary]);

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
