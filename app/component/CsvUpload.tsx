import React, { useRef, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import Papa from "papaparse";
import { DepartmentType } from "~/model/data/actions";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
const CSVSelector = ({ department }: { department: DepartmentType }) => {
  const [data, setData] = React.useState([]);
  const [filename, setFileName] = React.useState(null);
  const dataUpload = useFetcher();
  const hiddenFileInput = useRef(null);
  const handleFileChange = (event) => {
    let file = event.target.files[0];
    if (file) {
      let filename = event.target.files[0].name;
      if (filename.includes(".csv")) {
        filename = filename.replace(".csv", "");
      }
      setFileName(filename);
    }
    //  Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      skipEmptyLines: true,
      complete: async function (results) {
        let data = results?.data?.map((item) => item[0]);
        console.log(data);
        setData(data);
      },
    });
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
          accept=".csv"
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

export default CSVSelector;
