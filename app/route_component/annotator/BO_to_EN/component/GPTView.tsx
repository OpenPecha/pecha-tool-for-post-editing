import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Loading } from "~/component/Loading";
import { cleanUpSymbols } from "~/lib/cleanupText";
import { dictionaryState, mitraTextState } from "../state";
import useDebounce from "~/lib/useDebounce";
import { useLoaderData, useFetcher } from "@remix-run/react";
import CopyButton from "~/component/CopyButton";
import { Card, CardDescription } from "~/components/ui/card";
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
  }, [text]);
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
      }
    );
    setContent("");
  }
  const disabled = submitResult.state !== "idle" || content.length < 5 || !text;
  return (
    <Card className="mt-2">
      <CardDescription className="flex items-center justify-between bg-yellow-100 p-1">
        <div className="box-title px-2">Final:</div>
        <div className="flex">
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className="btn-sm bg-green-400 disabled:bg-gray-400"
          >
            submit
          </button>
          <CopyButton textToCopy={cleanUpSymbols(content)} />
        </div>
      </CardDescription>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="box-content" style={{ maxWidth: "95%" }}>
          {cleanUpSymbols(content) || "Enter something in Source"}
        </div>
      )}
    </Card>
  );
}

export default GPTview;
