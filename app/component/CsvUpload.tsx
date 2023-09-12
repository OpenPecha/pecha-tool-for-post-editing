import React from "react";
import { useFetcher } from "react-router-dom";
import Papa from "papaparse";
import { DepartmentType } from "~/model/data/actions";

const CSVSelector = ({ department }: { department: DepartmentType }) => {
  const [data, setData] = React.useState([]);
  const [fileName, setFileName] = React.useState(null);
  const dataUpload = useFetcher();
  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      let filename = event.target.files[0].name;
      if (filename.includes(".csv")) {
        filename = filename.replace(".csv", "");
      }
      setFileName(filename);
    }
    //  Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        setData(results?.data);
      },
    });
  };
  const handleUpload = () => {
    if (data.length < 1) return null;
    const value = JSON.stringify(data);
    try {
      dataUpload.submit(
        {
          name: fileName,
          data: value,
          department,
        },
        {
          method: "POST",
          action: "/api/upload",
        }
      );
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
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file-input file-input-bordered file-input-sm w-full max-w-xs"
        />
        <button
          onClick={handleUpload}
          className=" bg-green-300 btn-sm rounded-md min-h-0"
        >
          {dataUpload.state !== "idle" ? <div>uploading</div> : <>upload</>}
        </button>
      </div>
    </>
  );
};

export default CSVSelector;
