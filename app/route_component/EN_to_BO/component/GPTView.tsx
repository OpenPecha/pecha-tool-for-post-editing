import React, { useEffect, useState, useRef } from "react";
import { Loading } from "~/component/Loading";
import { SaveButton, SaveButtonWithTick } from "~/component/SaveButton";
import { GptImage } from "~/component/layout/SVGS";
import { cleanUpSymbols } from "~/lib/cleanupText";

type GPTViewProps = {
  text: string;
  setContent: (data: string) => void;
  promptData: string;
  color: string;
};

function GPTView({ text, setContent, promptData, color }: GPTViewProps) {
  const [temp, setTemp] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let prompt = `${promptData} : "${text}" `;
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
      setContent(res);
    }
    if (text && text !== "") fetchData();
  }, [text, promptData]);
  const handleSave = () => {
    setRefresh(false);
    let data = textRef.current?.innerText;
    setContent(data!);
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
      {isLoading && <Loading />}
      <div
        ref={textRef}
        contentEditable={true}
        onInput={handleChange}
        className="px-1 py-2"
      >
        {temp}
      </div>
    </div>
  );
}

export default GPTView;
