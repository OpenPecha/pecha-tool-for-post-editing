import type { V2_MetaFunction } from "@remix-run/node";
import { Link, useOutletContext, useNavigate } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui/card";
import { DepartmentType } from "~/model/data/actions";
import { FaExchangeAlt } from "react-icons/fa";
export const meta: V2_MetaFunction = () => {
  return [
    { title: "Post editing" },
    { name: "description", content: "post editing" },
  ];
};

export default function Index() {
  const user = useOutletContext();
  const username = user?.username;
  const navigate = useNavigate();

  const handleGoto = (department: DepartmentType) => {
    let url = username
      ? `/${department}?session=${username}`
      : `/${department}`;
    navigate(url);
  };
  return (
    <div className="w-full h-[100dvh] flex justify-center gap-3 items-center">
      <Card
        onClick={() => handleGoto("bo_en")}
        className="cursor-pointer hover:bg-gray-200"
      >
        <CardContent className="flex gap-3 items-center mt-4">
          བོད་ཡིག་ <FaExchangeAlt /> English
        </CardContent>
      </Card>
      <Card
        onClick={() => handleGoto("en_bo")}
        className="cursor-pointer hover:bg-gray-200"
      >
        <CardContent className=" flex gap-3 items-center mt-4">
          ENGLISH <FaExchangeAlt /> བོད་ཡིག་
        </CardContent>
      </Card>
    </div>
  );
}
