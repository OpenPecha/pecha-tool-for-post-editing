import { useEffect, useState } from "react";
import { fetchDharmaMitraData, languageType } from "~/api";
import { SaveButton, SaveButtonWithTick } from "../../../component/SaveButton";
import _ from "lodash";
import { DharmaLogo } from "~/component/layout/SVGS";
import { Loading } from "~/component/Loading";

interface TextViewProps {
  text: string | null;
  language: languageType;
  setContent: (data: string) => void;
  content: string;
}

function MitraTextView({ text, language, setContent }: TextViewProps) {
  const [data, setData] = useState("");
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (text) {
      if (!text?.endsWith("།")) text = text + "།";
      text = text + " ";

      async function fetchdata(text: string) {
        setIsLoading(true);
        let res = await fetchDharmaMitraData(text, "bo-en");
        console.log(res);
        setData(res?.data);
        setContent(res?.data);
        setIsLoading(false);
      }
      if (text) fetchdata(text);
    }
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
    <div className="overflow-hidden mt-2 border-2 border-gray-400 shadow-sm">
      <div className="flex items-center justify-between bg-green-200">
        <div className="box-title w-fit p-1 flex items-center gap-2">
          Source ➜
          <DharmaLogo />
        </div>
        <button onClick={handleSave}>
          {isContentChanged ? <SaveButton /> : <SaveButtonWithTick />}
        </button>
      </div>
      {isLoading && <Loading />}
      <textarea
        value={data || ""}
        onChange={handleChange}
        className="w-full bg-white border-none text-[20px] "
        rows={6}
      />
    </div>
  );
}

export default MitraTextView;
