import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DepartmentType } from "~/model/data/actions";
import { getData } from "~/model/text";
import { useState } from "react";
import _ from "lodash";
import AboutText from "~/route_component/admin/AboutText";
export const loader: LoaderFunction = async ({ request, params }) => {
  let department = params.department as DepartmentType;
  let text = await getData(department);
  const groupedData = _.groupBy(text, "name");
  return { groupedData };
};

function department() {
  const { groupedData } = useLoaderData();
  const [selectedText, setSelectedText] = useState(null);
  const handleSelection = (value) => {
    setSelectedText(value);
  };
  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 ">
      <div className="col-span-12 xl:col-span-8 ">
        <AboutText text={groupedData[selectedText]} />
      </div>
      <div className="col-span-12 xl:col-span-4">
        <div className="shadow-md w-full">
          <h1 className="text-light text-gray-500">Texts</h1>
          {Object.keys(groupedData).map((key) => {
            return (
              <div
                key={key}
                className="px-2 cursor-pointer w-full hover:bg-gray-200 dark:hover:bg-boxdark"
                onClick={() => handleSelection(key)}
              >
                {key}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default department;
