import { useEffect, useState } from "react";
import { fetchDharmaMitraData, languageType } from "~/api";
import { Loading } from "~/component/Loading";
import useDharmaMitraTranslation from "~/component/hook/useDharmaMitraTranslation";
import useDharmaMitraData from "~/component/hook/useDharmaMitraTranslation";
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
  const debounced_text = useDebounce(text, 1000);
  let { data, isLoading, error } = useDharmaMitraTranslation(
    debounced_text,
    "en-bo"
  );

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
      {error && <div className="text-red-500">{error}</div>}
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className="box-content h-[80%]"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      )}
    </div>
  );
}

export default MitraTextView;
