import { useEffect, useState } from "react";
import { fetchDharmaMitraData, languageType } from "~/api";

interface TextViewProps {
  text: string;
  language: languageType;
  onBoxClick: (data: any) => void;
  name: string;
}

function MitraTextView({ text, language, onBoxClick, name }: TextViewProps) {
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
    <div onClick={() => onBoxClick({ text: data, name })}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="box-title" style={{ width: "fit-content", padding: 5 }}>
          <img
            src="https://media.discordapp.net/attachments/959329505661554708/1136273342224138260/mitra-logo_3.png?width=662&height=662"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="box-content">{!isLoading ? data : "loading"}</div>
      {!data && !isLoading && (
        <div style={{ float: "right" }}>
          <div onClick={() => setRefresh((p) => !p)}>refetch</div>
        </div>
      )}
    </div>
  );
}

export default MitraTextView;
