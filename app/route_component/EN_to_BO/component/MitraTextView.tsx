import { useEffect, useState } from "react";
import { fetchDharmaMitraData, languageType } from "~/api";

interface TextViewProps {
  text: string;
  language: languageType;
  onBoxClick: (data: any) => void;
  name: string;
  color: string;
}

function MitraTextView({
  text,
  language,
  onBoxClick,
  name,
  color,
}: TextViewProps) {
  const [data, setData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      setIsloading(true);
      let res = await fetchDharmaMitraData(text, language);
      setData(res?.data);
      setIsloading(false);
    }
    if (text) fetchdata();
  }, [text, refresh]);
  return (
    <div
      onClick={() => onBoxClick({ text: data, name })}
      style={{ height: "100%" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: color,
        }}
      >
        <div
          className="box-title"
          style={{
            width: "fit-content",
            padding: 5,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          {color === "#86efac" ? (
            <img src="/asset/ChatGPT.png" width={20} height={20} />
          ) : (
            "source"
          )}
          ➜
          <img
            src="https://media.discordapp.net/attachments/959329505661554708/1136273342224138260/mitra-logo_3.png?width=662&height=662"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="box-content" style={{ height: "80%" }}>
        {!isLoading ? data : "loading"}
      </div>
    </div>
  );
}

export default MitraTextView;
