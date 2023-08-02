import React, { useEffect, useState } from "react";
import { SaveButton, SaveButtonWithTick } from "~/component/SaveButton";
import { cleanUpSymbols } from "~/lib/cleanupText";

function GPTView({ text, setContent, promptData }) {
  const [temp, setTemp] = useState("");
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    let prompt = `${promptData} : "${text}" `;
    let url = `/api/openai`;
    const formData = new FormData();
    formData.append("prompt", prompt);
    async function fetchData() {
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          let result = data.result;
          let res = cleanUpSymbols(result?.trim());
          setTemp(res);
          setContent(res);
        });
    }
    if (text && text !== "") fetchData();
  }, [text, promptData]);
  const handleSave = () => {
    setRefresh(false);
    setContent(temp);
  };
  const handleChange = (e) => {
    setRefresh(true);
    setTemp(e.target.value);
  };
  return (
    <div className="container-view">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 5,
        }}
      >
        <div className="box-title" style={{ width: "fit-content", padding: 5 }}>
          <img src="/asset/ChatGPT.png" width={20} height={20} />
        </div>
        <button onClick={handleSave}>
          {refresh ? <SaveButton /> : <SaveButtonWithTick />}
        </button>
      </div>
      <textarea value={temp} onChange={handleChange}></textarea>
    </div>
  );
}

export default GPTView;
