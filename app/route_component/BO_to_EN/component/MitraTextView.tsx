import { useEffect, useState } from "react";
import { SaveButton, SaveButtonWithTick } from "../../../component/SaveButton";
import _ from "lodash";
import { DharmaLogo } from "~/component/layout/SVGS";
import { useRecoilState, useRecoilValue } from "recoil";
import { mainTextState, mitraTextState } from "../state";
import useDebounce from "~/lib/useDebounce";
import { useFetcher } from "@remix-run/react";
function MitraTextView() {
  const sourceText = useRecoilValue(mainTextState);
  const [currentData, setData] = useRecoilState(mitraTextState);
  const [isContentChanged, setIsContentChanged] = useState(false);
  let debourcedText = useDebounce(sourceText, 1000);
  let fetcher = useFetcher();
  let data = fetcher.data;

  useEffect(() => {
    if (debourcedText) {
      fetcher.submit(
        { sentence: debourcedText, language: "bo-en" },
        {
          method: "POST",
          action: "/api/mitra",
        }
      );
    }
  }, [debourcedText]);

  useEffect(() => {
    if (data) {
      setData(data.data);
    }
  }, [data]);
  function handleSave() {
    setIsContentChanged(false);
    console.log(data);
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
      {fetcher.state !== "idle" ? (
        <div className="text-center">loading</div>
      ) : (
        <textarea
          value={currentData || ""}
          onChange={handleChange}
          className="w-full bg-white border-none text-[20px] "
          rows={6}
        />
      )}
    </div>
  );
}

export default MitraTextView;
