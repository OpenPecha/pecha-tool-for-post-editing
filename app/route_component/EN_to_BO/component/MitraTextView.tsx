import { useEffect, useState } from "react";
import { fetchDharmaMitraData, languageType } from "~/api";
import useDebounce from "~/lib/useDebounce";

interface TextViewProps {
  text: string;
  language: languageType;
  onBoxClick: (data: any) => void;
  name: string;
}

function MitraTextView({ text, language, onBoxClick, name }: TextViewProps) {
  const [data, setData] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      setIsloading(true);
      fetchDharmaMitraData(text, language)
        .then((res) => {
          setData(res?.data);
          setIsloading(false);
        })
        .catch((e) => {
          setIsloading(false);
          console.log(e);
        });
    }
    if (text) fetchdata();
  }, [text]);
  return (
    <div onClick={() => onBoxClick({ text: data, name })}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="box-title">Mitra :</div>
      </div>
      <div className="box-content">{!isLoading ? data : "loading"}</div>
    </div>
  );
}

export default MitraTextView;
