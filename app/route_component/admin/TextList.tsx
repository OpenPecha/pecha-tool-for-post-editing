import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigate,
  useLocation,
} from "@remix-run/react";
import { Card } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";

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
  const location = useLocation();
  useEffect(() => {
    navigate(url);
  }, [department]);

  return (
    <Card>
      <h1 className="text-light text-gray-500 pt-2 pl-2">Texts</h1>

      <ScrollArea className="max-h-[60dvh] mt-2 flex flex-col-reverse gap-2 p-2">
        {Object.keys(groupedData).map((key, index) => {
          const value = groupedData[key];
          let asignedUser = value[0]?.transcriber?.username || null;
          let url = `/admin/text/${department}/${key}?session=${session}`;
          return (
            <Card
              className="flex justify-between items-center mt-1 overflow-hidden"
              key={key}
              style={{
                background: location.pathname.includes(key)
                  ? "#eee"
                  : "transparent",
              }}
            >
              <Link
                key={key + index}
                className={`px-2
            cursor-pointer w-full  hover:bg-slate-200 transition-all duration-500 dark:hover:bg-boxdark
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
            </Card>
          );
        })}
      </ScrollArea>
    </Card>
  );
}

export default TextList;
