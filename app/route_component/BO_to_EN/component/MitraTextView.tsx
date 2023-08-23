import { useEffect, useState } from "react";
import { fetchDharmaMitraData, languageType } from "~/api";
import { SaveButton, SaveButtonWithTick } from "../../../component/SaveButton";
import _ from "lodash";
import useDebounce from "~/lib/useDebounce";
import { DharmaLogo } from "~/component/layout/SVGS";

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
      let url = "/api/mitra?sentence=" + text + "&language=" + language;

      async function fetchdata() {
        setIsLoading(true);
        fetch(url)
          .then((data) => data.json())
          .then((res) => {
            setData(res.data.data);
            setContent(res.data.data);
            setIsLoading(false);
          })
          .catch((e) => setIsLoading(false));
      }
      if (text) fetchdata();
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
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <DharmaLogo />
          )}
        </div>
        <button onClick={handleSave}>
          {isContentChanged ? <SaveButton /> : <SaveButtonWithTick />}
        </button>
      </div>

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
