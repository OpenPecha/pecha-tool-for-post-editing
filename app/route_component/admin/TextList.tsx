import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import {
  Link,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
function TextList({ department, groupedData }: any) {
  let { session } = useLoaderData();
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
  const url = `/admin/text/${department}/${
    Object.keys(groupedData)[0]
  }?session=${session}`;
  const navigate = useNavigate();
  useEffect(() => {
    navigate(url);
  }, [department]);

  return (
    <div className="shadow-sm mt-2 flex flex-col-reverse">
      {Object.keys(groupedData).map((key, index) => {
        const value = groupedData[key];
        let asignedUser = value[0]?.transcriber?.username || null;
        let url = `/admin/text/${department}/${key}?session=${session}`;
        return (
          <div className="flex justify-between items-center" key={key}>
            <Link
              key={key + index}
              className={`px-2
            cursor-pointer w-full  hover:bg-gray-200 dark:hover:bg-boxdark
            ${false ? "bg-gray-200 dark:bg-boxdark" : ""}
            `}
              to={url}
            >
              <div>
                {key}
                <div className="text-xs">{asignedUser}</div>
              </div>
            </Link>
            <button
              onClick={() => handleDelete(key)}
              className="rounded-full h-fit hover:bg-gray-400 p-1"
            >
              <AiFillDelete />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default TextList;
