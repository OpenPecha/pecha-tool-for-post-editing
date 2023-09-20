import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import TextView from "~/component/TextView";
import TiptapEditor from "~/component/TiptapEditor";
import { mainTextState } from "../state";
import { useLoaderData } from "@remix-run/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
type SourceProps = {};

function Source({}: SourceProps) {
  let { text } = useLoaderData();
  let [, setMainText] = useRecoilState(mainTextState);

  useEffect(() => {
    setMainText(text?.original_text);
    setSourceText(text?.original_text);
  }, [text]);

  let [sourceText, setSourceText] = useState<string>("");
  let [edit, setEdit] = useState<boolean>(true);
  let handleMainTextChange = (value) => {
    setSourceText(value);
    setMainText(value);
  };
  return (
    <>
      <Tabs defaultValue="source" className="w-full">
        <TabsList>
          <TabsTrigger value="source">Source</TabsTrigger>
          <TabsTrigger value="dictionary">Dictionary</TabsTrigger>
        </TabsList>
        <TabsContent value="source">
          <TextView
            text={sourceText}
            setMainText={handleMainTextChange}
            color="#93c5fd"
          ></TextView>
        </TabsContent>
        <TabsContent value="dictionary">
          <TiptapEditor sourceText={sourceText} setEdit={setEdit} />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Source;
