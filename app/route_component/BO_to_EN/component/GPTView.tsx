import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Loading } from "~/component/Loading";
import { cleanUpSymbols } from "~/lib/cleanupText";
import { dictionaryState, mitraTextState } from "../state";
import useDebounce from "~/lib/useDebounce";
import { useLoaderData, useFetcher, useRevalidator } from "@remix-run/react";
function GPTview() {
  let { text, user, department } = useLoaderData();
  let data = useRecoilValue(mitraTextState);
  let dictionary_data = useRecoilValue(dictionaryState);
  let mitraText = useDebounce(data, 1000);
  let dictionary = useDebounce(dictionary_data, 1000);
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const submitResult = useFetcher();
  useEffect(() => {
    setContent("");
  }, []);
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
  function handleSubmit() {
    submitResult.submit(
      {
        id: text.id,
        user_id: user.id,
        result: cleanUpSymbols(content),
        department,
        action: "save_text",
      },
      {
        method: "PATCH",
        action: "/api/text",
      }
    );
    setContent("");
  }
  const disabled = submitResult.state !== "idle" || content.length < 5;
  return (
    <div className="final-box">
      <div className="flex items-center justify-between bg-yellow-100">
        <div className="box-title px-2">Final:</div>
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className="btn-sm bg-green-400 disabled:bg-gray-400"
        >
          submit
        </button>
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
