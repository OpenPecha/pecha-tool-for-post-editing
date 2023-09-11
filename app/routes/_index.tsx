import type { V2_MetaFunction } from "@remix-run/node";
import { Link, useOutletContext } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Post editing" },
    { name: "description", content: "post editing" },
  ];
};

export default function Index() {
  let className = "btn ";
  const user = useOutletContext();
  const username = user?.username;
  return (
    <div className="w-full h-[100dvh] flex justify-center gap-3 items-center">
      <Link to={"/bo2en?session=" + username} className={className}>
        བོད་ཡིག་
        <div>to</div>
        English
      </Link>
      <Link to={"/en2bo?session=" + username} className={className}>
        ENGLISH
        <div>to</div>
        བོད་ཡིག་
      </Link>
    </div>
  );
}
