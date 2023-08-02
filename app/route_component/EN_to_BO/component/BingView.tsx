import { useEffect, useState } from "react";

type BingType = {
  text: string;
  onBoxClick: (data: any) => void;
  name: string;
};

function BingView({ text, onBoxClick, name }: BingType) {
  const [isLoading, setIsloading] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    if (text) {
      setIsloading(true);
      const url = "/api/bingai";
      const formData = new FormData();
      formData.append("text", text);
      formData.append("language", "en-bo");
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setContent(data.result.trim());
          setIsloading(false);
          if (name === "bing1") onBoxClick({ text: data.result.trim(), name });
        })
        .catch((e) => {
          setIsloading(false);
        });
    }
  }, [text]);

  return (
    <div onClick={() => onBoxClick({ text: content, name })}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="box-title">
          <img
            src="https://cdn.geekwire.com/wp-content/uploads/2020/10/0EVE9TeW_400x400.png"
            width={40}
            height={40}
          ></img>
        </div>
      </div>
      <div className="box-content">{!isLoading ? content : "loading"}</div>
    </div>
  );
}

export default BingView;
