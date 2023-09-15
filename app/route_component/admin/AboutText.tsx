import { useLocation, Link, Outlet } from "@remix-run/react";
import { useRef } from "react";
import AssignTranscriber from "./AssignTranscriber";
function AboutText({ text, name }: any) {
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let color = {
    APPROVED: "bg-green-400",
    PENDING: "bg-yellow-400",
    REJECTED: "bg-red-400",
  };
  return (
    <>
      <AssignTranscriber transcriber={text?.at(0).transcriber} name={name} />
      <div className="flex flex-wrap gap-2 ">
        <Outlet />
        {text?.map((item, index) => {
          let url = item.id + "?session=" + searchParams.get("session");
          return (
            <Link to={url} key={item.id + index}>
              <span
                className={`bg-gray-300 hover:bg-gray-400 rounded cursor-pointer ${
                  color[item.status]
                }`}
              >
                {item.id}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default AboutText;
