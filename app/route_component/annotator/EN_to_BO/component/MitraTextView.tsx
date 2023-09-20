import { Loading } from "~/component/Loading";
import useDharmaMitraTranslation from "~/component/hook/useDharmaMitraTranslation";
import { DharmaLogo, GptImage } from "~/component/layout/SVGS";
import { Card, CardDescription } from "~/components/ui/card";
import useDebounce from "~/lib/useDebounce";

interface TextViewProps {
  text: string;
  onBoxClick: (data: any) => void;
  name: "mitra1" | "mitra2" | null;
  color: string;
  selectedOption: "mitra1" | "mitra2" | null;
}

function MitraTextView({
  text,
  onBoxClick,
  name,
  color,
  selectedOption,
}: TextViewProps) {
  console.log(name, selectedOption);
  const debounced_text = useDebounce(text, 1000);
  let { data, isLoading, error } = useDharmaMitraTranslation(
    debounced_text,
    "en-bo"
  );
  return (
    <Card
      onClick={() => onBoxClick({ text: data, name })}
      className={` overflow-hidden w-[50%] cursor-pointer ${
        selectedOption === name ? "border-2 border-blue-500" : ""
      }}`}
    >
      <CardDescription
        className="flex items-center justify-between "
        style={{
          background: color,
        }}
      >
        <div className="box-title w-fit p-1 flex items-center gap-2">
          {color === "#86efac" ? <GptImage /> : "source "}➜<DharmaLogo />
        </div>
      </CardDescription>
      {error && <div className="text-red-500">{error}</div>}
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className="box-content h-[80%]"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      )}
    </Card>
  );
}

export default MitraTextView;
