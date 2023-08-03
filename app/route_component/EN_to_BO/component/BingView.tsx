import { useEffect, useState } from "react";

type BingType = {
  text: string;
  name: string;
};

function BingView({ text, name }: BingType) {
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
        })
        .catch((e) => {
          setIsloading(false);
        });
    }
  }, [text]);

  return (
    <div>
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
            width={30}
            height={30}
          ></img>
        </div>
      </div>
      <div style={{ padding: 10 }}>{!isLoading ? content : "loading"}</div>
    </div>
  );
}

export default BingView;
