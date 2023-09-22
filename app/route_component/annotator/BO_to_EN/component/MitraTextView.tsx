import { useEffect, useState } from "react";
import { SaveButton } from "~/component/SaveButton";
import _ from "lodash";
import { DharmaLogo } from "~/component/layout/SVGS";
import { useRecoilState, useRecoilValue } from "recoil";
import { mainTextState, mitraTextState } from "../state";
import useDebounce from "~/lib/useDebounce";
import useDharmaMitraTranslation from "~/component/hook/useDharmaMitraTranslation";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardDescription } from "~/components/ui/card";
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
    <Card className="overflow-hidden mt-2 ">
      <CardDescription className="flex items-center justify-between bg-green-200">
        <div className="box-title w-fit p-1 flex items-center gap-2">
          Source ➜
          <DharmaLogo />
        </div>
        <SaveButton handleClick={handleSave} condition={isContentChanged} />
      </CardDescription>
      {error && <div className="text-red-500">{error}</div>}
      {isLoading ? (
        <div className="text-center">loading</div>
      ) : (
        <Textarea value={currentData || ""} onChange={handleChange} rows={6} />
      )}
    </Card>
  );
}

export default MitraTextView;
