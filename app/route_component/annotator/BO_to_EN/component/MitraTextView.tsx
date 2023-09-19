import { useEffect, useState } from "react";
import { SaveButton, SaveButtonWithTick } from "~/component/SaveButton";
import _ from "lodash";
import { DharmaLogo } from "~/component/layout/SVGS";
import { useRecoilState, useRecoilValue } from "recoil";
import { mainTextState, mitraTextState } from "../state";
import useDebounce from "~/lib/useDebounce";
import useDharmaMitraTranslation from "~/component/hook/useDharmaMitraTranslation";
function MitraTextView() {
  const sourceText = useRecoilValue(mainTextState);
  const [currentData, setData] = useRecoilState(mitraTextState);
  const [isContentChanged, setIsContentChanged] = useState(false);
  let debourcedText = useDebounce(sourceText, 1000);
  let { data, isLoading, error } = useDharmaMitraTranslation(
    debourcedText,
    "bo-en"
  );
  useEffect(() => {
    if (data && data?.length > 0) setData(data);
  }, [data]);

  function handleSave() {
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
      {error && <div className="text-red-500">{error}</div>}
      {isLoading ? (
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
