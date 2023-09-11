import React from "react";
import { useFetcher } from "react-router-dom";
import Papa from "papaparse";
import { DepartmentType } from "~/model/data/actions";

const CSVSelector = () => {
  const [data, setData] = React.useState([]);
  const [fileName, setFileName] = React.useState(null);
  const dataUpload = useFetcher();
  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setFileName(event.target.files[0].name);
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
    const department: DepartmentType = "bo_en";
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
    }
  };
  return (
    <>
      {dataUpload.data?.error && (
        <div className="text-red-600">{dataUpload.data.error}</div>
      )}
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>
        {dataUpload.state !== "idle" ? <div>uploading</div> : <>upload</>}
      </button>
    </>
  );
};

export default CSVSelector;
