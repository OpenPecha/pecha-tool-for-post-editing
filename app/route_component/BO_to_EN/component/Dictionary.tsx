import React, { useEffect, useMemo, useState } from "react";
import { SaveButton, SaveButtonWithTick } from "../../../component/SaveButton";
import { useFetcher } from "@remix-run/react";
import useDebounce from "~/lib/useDebounce";

function Dictionary({ setDictionary, text }) {
  const [data, setUpdatedDictionary] = useState(null);
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  useEffect(() => {
    async function fetcherdata() {
      let url = "/api/dictionary/" + text;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setSelectedWord(Object.keys(data)[0]);
          setUpdatedDictionary(data);
        });
    }
    if (text) fetcherdata();
  }, [text]);

  useEffect(() => {
    if (data) setDictionary(JSON.stringify(data));
  }, [data]);

  const handleChange = (key, newValue) => {
    setUpdatedDictionary((prev) => {
      return { ...prev, [key]: newValue };
    });
    setIsContentChanged(true);
  };
  const handleSave = () => {
    const newDictionary = data;
    setDictionary(JSON.stringify(newDictionary));
    setIsContentChanged(false);
  };
  const handleWordClick = (word) => {
    setSelectedWord(word);
  };

  return (
    <div className="dictionary-container container-view">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h2>Dictionary</h2>
        <button onClick={handleSave}>
          {isContentChanged ? <SaveButton /> : <SaveButtonWithTick />}
        </button>
      </div>
      <div className="dictionary-key">
        {data &&
          Object.keys(data).map((key) => (
            <div key={key} onClick={() => handleWordClick(key)}>
              <div
                className={`dictionary-row ${
                  selectedWord === key ? "selected" : ""
                }`}
              >
                <span>{key}</span>
              </div>
            </div>
          ))}
      </div>
      {selectedWord && (
        <div className="selected-word-meaning" style={{ width: "100%" }}>
          <h3 style={{ fontWeight: "bold" }}>{selectedWord}</h3>
          <textarea
            style={{
              fontSize: 15,
              width: "100%",
              height: "100%",
              background: "white",
            }}
            rows={10}
            onChange={(e) => handleChange(selectedWord, e.target.value)}
            value={data[selectedWord] || ""}
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default Dictionary;
