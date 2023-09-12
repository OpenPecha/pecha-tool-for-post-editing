import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useFetcher } from "@remix-run/react";
function TextList({
  department,
  groupedData,
  handleSelection,
  selectedText,
}: any) {
  const deleteFetcher = useFetcher();
  const handleDelete = (key) => {
    deleteFetcher.submit(
      {
        text_name: key,
      },
      {
        method: "DELETE",
      }
    );
  };
  useEffect(() => {
    handleSelection(Object.keys(groupedData)[0]);
  }, [department]);

  return (
    <>
      {Object.keys(groupedData).map((key, index) => {
        return (
          <div
            key={key + index}
            className={`px-2
             cursor-pointer w-full flex justify-between hover:bg-gray-200 dark:hover:bg-boxdark
             ${selectedText === key ? "bg-gray-200 dark:bg-boxdark" : ""}
             `}
            onClick={() => handleSelection(key)}
          >
            {key}
            <button
              onClick={() => handleDelete(key)}
              className="rounded-full hover:bg-gray-400"
            >
              <AiFillDelete />
            </button>
          </div>
        );
      })}
    </>
  );
}

export default TextList;
