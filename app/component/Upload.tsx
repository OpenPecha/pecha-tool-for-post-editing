import React, { useRef, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { DepartmentType } from "~/model/data/actions";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
const UploadText = ({ department }: { department: DepartmentType }) => {
  const [data, setData] = React.useState([]);
  const [filename, setFileName] = React.useState(null);
  const dataUpload = useFetcher();
  const hiddenFileInput = useRef(null);
  const handleFileChange = (event) => {
    let file = event.target.files[0];
    if (file) {
      let filename = event.target.files[0].name;
      if (filename.includes(".txt")) {
        filename = filename.replace(".txt", "");
      }
      setFileName(filename);
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      let data_result = event.target.result;
      data_result = data_result.split("\n");
      if (data_result?.length > 0) {
        data_result = data_result.filter((item) => item !== "");
        setData(data_result);
      }
    };
    reader.readAsText(file);
  };
  const handleUpload = () => {
    if (data.length < 1) return null;
    const value = JSON.stringify(data);
    try {
      dataUpload.submit(
        {
          filename,
          data: value,
          department,
        },
        {
          method: "POST",
        }
      );
      hiddenFileInput.current.value = null;
    } catch (error) {
      console.error(error);
    } finally {
      setData([]);
      setFileName(null);
    }
  };

  return (
    <>
      {dataUpload.data?.error && (
        <div className="text-red-600">{dataUpload.data.error}</div>
      )}
      <div className="flex gap-3 mb-3">
        <Input
          accept=".txt"
          type="file"
          onChange={handleFileChange}
          ref={hiddenFileInput}
        />

        <Button onClick={handleUpload}>
          {dataUpload.state !== "idle" ? <div>uploading</div> : <>upload</>}
        </Button>
      </div>
    </>
  );
};

export default UploadText;
