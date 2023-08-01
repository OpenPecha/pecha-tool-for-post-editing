import React, { useEffect, useState } from "react";
import { SaveButton, SaveButtonWithTick } from "~/component/SaveButton";
import { cleanUpSymbols } from "~/lib/cleanupText";

function GPTView({ text, formal, setContent, isSelected }) {
  const [temp, setTemp] = useState("");

  useEffect(() => {
    let prompt = `rewrite in ${
      formal ? "formal" : "non-formal"
    } ways : "${text}" dont add extra meaning`;
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
  }, [text]);
  const handleSave = () => {
    setContent(temp);
  };
  const handleChange = (e) => {
    setTemp(e.target.value);
  };
  return (
    <div className="container-view">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="box-title">GPT :</div>
        <button onClick={handleSave}>
          {!isSelected ? <SaveButton /> : <SaveButtonWithTick />}
        </button>
      </div>
      <textarea value={temp} onChange={handleChange}></textarea>
    </div>
  );
}

export default GPTView;
