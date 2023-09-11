import { useEffect, useState } from "react";
import { fetchDharmaMitraData, languageType } from "~/api";
import { Loading } from "~/component/Loading";
import { DharmaLogo, GptImage } from "~/component/layout/SVGS";
import useDebounce from "~/lib/useDebounce";

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
  const [isLoading, setIsloading] = useState(false);
  const debounced_text = useDebounce(text, 1000);
  useEffect(() => {
    if (debounced_text) {
      async function fetchdata() {
        setIsloading(true);
        let res = await fetchDharmaMitraData(debounced_text, language);
        setData(res?.data);
        setIsloading(false);
      }
      fetchdata();
    }
  }, [debounced_text]);
  return (
    <div onClick={() => onBoxClick({ text: data, name })} className="h-full">
      <div
        className="flex items-center justify-between "
        style={{
          background: color,
        }}
      >
        <div className="box-title w-fit p-1 flex items-center gap-2">
          {color === "#86efac" ? <GptImage /> : "source "}➜<DharmaLogo />
        </div>
      </div>
      <div className="box-content h-[80%]">
        {isLoading ? <Loading /> : data}
      </div>
    </div>
  );
}

export default MitraTextView;
