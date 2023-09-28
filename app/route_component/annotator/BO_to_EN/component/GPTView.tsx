import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Loading } from "~/component/Loading";
import { cleanUpSymbols } from "~/lib/cleanupText";
import {
  activeTime,
  dictionaryState,
  mainTextState,
  mitraTextState,
} from "~/route_component/annotator/BO_to_EN/state";
import useDebounce from "~/lib/useDebounce";
import {
  useLoaderData,
  useFetcher,
  useNavigate,
  useLocation,
} from "@remix-run/react";
import CopyButton from "~/component/CopyButton";
import { Card, CardDescription } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

function GPTview() {
  let { text, user, department, history } = useLoaderData();
  let [duration, setDuration] = useRecoilState(activeTime);
  let data = useRecoilValue(mitraTextState);
  let [dictionary_data, setDictionary] = useRecoilState(dictionaryState);
  let [mainText] = useRecoilState(mainTextState);
  let mitraText = useDebounce(data, 1000);
  let dictionary = useDebounce(dictionary_data, 1000);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const submitResult = useFetcher();
  useEffect(() => {
    if (mainText === "") {
      setContent("");
    }
  }, [mainText]);
  useEffect(() => {
    async function fetchdata() {
      setIsLoading(true);

      let prompt = `[paste the result here] ,Edit the following without adding information: ${mitraText} `;
      // filter dictionary data for only non emply value
      if (!!dictionary) {
        let dict = { ...dictionary };
        for (const key in dict) {
          if (dict[key] !== "") {
            dict[key] = dict[key];
          }
        }
        prompt += `[please use this dictionary for translation of tibetan to english ${JSON.stringify(
          dict
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
        duration,
        action: "save_text",
      },
      {
        method: "PATCH",
      }
    );
    setContent("");
    setDuration(0);
    setDictionary(null);
  }
  function cancel() {
    setDuration(0);
    const updatedURL = `${location.pathname}?session=${user.username}`;
    navigate(updatedURL);
  }
  const disabled = submitResult.state !== "idle" || content.length < 5 || !text;
  return (
    <Card className="mt-2">
      <CardDescription className="flex items-center justify-between bg-yellow-100 p-1">
        <div className="box-title px-2">Final:</div>
        <div className="flex gap-2 mr-2">
          <Button
            onClick={handleSubmit}
            disabled={disabled}
            className="bg-green-400 disabled:bg-gray-400 h-5"
          >
            submit
          </Button>
          {history && (
            <Button onClick={cancel} className=" bg-red-400 h-5">
              cancel
            </Button>
          )}
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
