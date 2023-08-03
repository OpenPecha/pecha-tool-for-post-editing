import { useEffect, useState } from "react";
import { fetchDharmaMitraData, languageType } from "~/api";
import { SaveButton, SaveButtonWithTick } from "../../../component/SaveButton";
import _ from "lodash";
import useDebounce from "~/lib/useDebounce";

interface TextViewProps {
  text: string | null;
  language: languageType;
  setContent: (data: string) => void;
  content: string;
}

function MitraTextView({ text, language, setContent }: TextViewProps) {
  const [data, setData] = useState("");
  const [isContentChanged, setIsContentChanged] = useState(false);

  useEffect(() => {
    let url = "/api/mitra?sentence=" + text + "&language=" + language;

    async function fetchdata() {
      fetch(url)
        .then((data) => data.json())
        .then((res) => {
          setData(res.data.data);
          setContent(res.data.data);
        });
    }
    if (text) fetchdata();
  }, [text]);

  function handleSave() {
    setContent(data);
    setIsContentChanged(false);
  }
  function handleChange(e) {
    setData(e.target.value);
    setIsContentChanged(true);
  }
  return (
    <div className="container-view">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="box-title"
          style={{
            width: "fit-content",
            padding: 5,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          source ➜
          <img
            src="https://media.discordapp.net/attachments/959329505661554708/1136273342224138260/mitra-logo_3.png?width=662&height=662"
            width={20}
            height={20}
          />
        </div>
        <button onClick={handleSave}>
          {isContentChanged ? <SaveButton /> : <SaveButtonWithTick />}
        </button>
      </div>

      <textarea
        value={data || ""}
        onChange={handleChange}
        style={{ width: "100%", background: "white" }}
        rows={6}
      ></textarea>
    </div>
  );
}

export default MitraTextView;
