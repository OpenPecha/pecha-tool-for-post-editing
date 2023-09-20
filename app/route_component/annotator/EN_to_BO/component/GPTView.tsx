import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Loading } from "~/component/Loading";
import { SaveButton, SaveButtonWithTick } from "~/component/SaveButton";
import { GptImage } from "~/component/layout/SVGS";
import { cleanUpSymbols } from "~/lib/cleanupText";
import useDebounce from "~/lib/useDebounce";
import { gptResultState, promptState } from "../state";
import { Card, CardDescription } from "~/components/ui/card";

type GPTViewProps = {
  text: string;
  color: string;
};

function GPTView({ text, color }: GPTViewProps) {
  const setGptResult = useSetRecoilState(gptResultState);
  const prompt = useRecoilValue(promptState);

  const debounced_text = useDebounce(text, 1000);
  const promptData = useDebounce(prompt, 1000);

  const [temp, setTemp] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let prompt = `${promptData} : "${debounced_text}" `;
    let url = `/api/openai`;
    const formData = new FormData();
    formData.append("prompt", prompt);
    async function fetchData() {
      setIsloading(true);
      let responce = await fetch(url, {
        method: "POST",
        body: formData,
      });
      let data = await responce.json();
      let result = data.result;
      let res = cleanUpSymbols(result?.trim());
      setTemp(res);
      setIsloading(false);
      setGptResult(res);
    }
    if (debounced_text && debounced_text !== "") fetchData();
  }, [debounced_text, promptData]);
  const handleSave = () => {
    setRefresh(false);
    let data = textRef.current?.innerText;
    setGptResult(data!);
  };
  const handleChange = () => {
    setRefresh(true);
  };
  return (
    <Card className="overflow-hidden mt-2 ">
      <CardDescription
        className="flex items-center justify-between p-1 "
        style={{
          background: color,
        }}
      >
        <GptImage />
        <button onClick={handleSave}>
          {refresh ? <SaveButton /> : <SaveButtonWithTick />}
        </button>
      </CardDescription>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          ref={textRef}
          contentEditable={true}
          onInput={handleChange}
          className="px-1 py-2"
        >
          {temp}
        </div>
      )}
    </Card>
  );
}

export default GPTView;
