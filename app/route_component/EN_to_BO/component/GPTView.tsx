import React, { useEffect, useState, useRef } from "react";
import { SaveButton, SaveButtonWithTick } from "~/component/SaveButton";
import { cleanUpSymbols } from "~/lib/cleanupText";

function GPTView({ text, setContent, promptData, color }) {
  const [temp, setTemp] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const textRef = useRef(null);
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
    setContent(data);
  };
  const handleChange = (e) => {
    setRefresh(true);
  };
  return (
    <div className="container-view">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 5,
          background: color,
        }}
      >
        <div className="box-title" style={{ width: "fit-content", padding: 5 }}>
          <img src="/asset/ChatGPT.png" width={20} height={20} />
        </div>
        <button onClick={handleSave}>
          {refresh ? <SaveButton /> : <SaveButtonWithTick />}
        </button>
      </div>
      {isLoading && <div>loading...</div>}
      <div
        ref={textRef}
        contentEditable={true}
        onInput={handleChange}
        style={{ paddingInline: 5, paddingBlock: 10 }}
      >
        {temp}
      </div>
    </div>
  );
}

export default GPTView;
