import { useEffect, useState } from "react";
import { Loading } from "~/component/Loading";
import { Card, CardDescription } from "~/components/ui/card";
import useDebounce from "~/lib/useDebounce";

type BingType = {
  text: string;
  name: string;
};

function BingView({ text, name }: BingType) {
  const [isLoading, setIsloading] = useState(false);
  const [content, setContent] = useState("");
  let debounced_text = useDebounce(text, 1000);
  useEffect(() => {
    if (debounced_text) {
      setIsloading(true);
      const url = "/api/bingai";
      const formData = new FormData();
      formData.append("text", debounced_text);
      formData.append("language", "en-bo");
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setContent(data.result.trim());
          setIsloading(false);
        })
        .catch((e) => {
          setIsloading(false);
        });
    }
  }, [debounced_text]);

  return (
    <Card className="mt-2">
      <CardDescription className="flex items-center justify-between p-1">
        <img
          src="https://cdn.geekwire.com/wp-content/uploads/2020/10/0EVE9TeW_400x400.png"
          width={30}
          height={30}
        ></img>
      </CardDescription>
      <div className="p-2">{!isLoading ? content : <Loading />}</div>
    </Card>
  );
}

export default BingView;
