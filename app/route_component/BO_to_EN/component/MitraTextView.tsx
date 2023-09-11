import { useEffect, useState } from "react";
import { fetchDharmaMitraData, languageType } from "~/api";
import { SaveButton, SaveButtonWithTick } from "../../../component/SaveButton";
import _ from "lodash";
import { DharmaLogo } from "~/component/layout/SVGS";
import { Loading } from "~/component/Loading";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { mainTextState, mitraTextState } from "../state";
import useDebounce from "~/lib/useDebounce";

interface TextViewProps {}

function MitraTextView({}: TextViewProps) {
  const text = useRecoilValue(mainTextState);
  const [data, setData] = useState("");
  const setMitraText = useSetRecoilState(mitraTextState);
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let debouncedText = useDebounce(text, 1000);

  useEffect(() => {
    if (debouncedText) {
      if (!debouncedText?.endsWith("།")) debouncedText = debouncedText + "།";
      debouncedText = debouncedText + " ";

      async function fetchdata(text: string) {
        setIsLoading(true);
        let res = await fetchDharmaMitraData(text, "bo-en");
        setData(res?.data);
        setMitraText(res?.data);
        setIsLoading(false);
      }
      fetchdata(debouncedText);
    }
  }, [debouncedText]);

  function handleSave() {
    setMitraText(data);
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
      {isLoading ? (
        <Loading />
      ) : (
        <textarea
          value={data || ""}
          onChange={handleChange}
          className="w-full bg-white border-none text-[20px] "
          rows={6}
        />
      )}
    </div>
  );
}

export default MitraTextView;
