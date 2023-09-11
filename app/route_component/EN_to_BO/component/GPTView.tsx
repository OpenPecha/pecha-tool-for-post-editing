import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Loading } from "~/component/Loading";
import { SaveButton, SaveButtonWithTick } from "~/component/SaveButton";
import { GptImage } from "~/component/layout/SVGS";
import { cleanUpSymbols } from "~/lib/cleanupText";
import useDebounce from "~/lib/useDebounce";
import { gptResultState, promptState } from "../state";

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
    <div className="overflow-hidden mt-2 border-2 border-gray-400 shadow-sm">
      <div
        className="flex items-center justify-between p-1 "
        style={{
          background: color,
        }}
      >
        <div className="box-title w-fit p-1">
          <GptImage />
        </div>
        <button onClick={handleSave}>
          {refresh ? <SaveButton /> : <SaveButtonWithTick />}
        </button>
      </div>
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
    </div>
  );
}

export default GPTView;
