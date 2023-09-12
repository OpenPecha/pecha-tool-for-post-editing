import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DepartmentType } from "~/model/data/actions";
import { deleteTextWithName, getData } from "~/model/text";
import { useState } from "react";
import _ from "lodash";
import AboutText from "~/route_component/admin/AboutText";
import TextList from "~/route_component/admin/TextList";
import CSVSelector from "~/component/CsvUpload";
import { getUsers } from "~/model/user";
export const loader: LoaderFunction = async ({ request, params }) => {
  let department = params.department as DepartmentType;
  let text = await getData(department);
  let users = await getUsers();
  const groupedData = _.groupBy(text, "name");
  return { groupedData, department, users };
};

export const action: ActionFunction = async ({ request, params }) => {
  let formdata = await request.formData();
  let text_name = formdata.get("text_name") as string;
  let department = params.department as DepartmentType;
  try {
    let deleted = await deleteTextWithName(text_name, department);
    return deleted;
  } catch (e) {
    throw new Error(e);
  }
};

function department() {
  const { groupedData, department } = useLoaderData();
  const [selectedText, setSelectedText] = useState("");
  const handleSelection = (value: string) => {
    setSelectedText(value);
  };
  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 ">
      <div className="col-span-12 xl:col-span-8 ">
        <AboutText text={groupedData[selectedText]} name={selectedText} />
      </div>
      <div className="col-span-12 xl:col-span-4">
        <div className="shadow-md w-full">
          <CSVSelector department={department} />
          <h1 className="text-light text-gray-500">Texts</h1>
          <TextList
            department={department}
            selectedText={selectedText}
            groupedData={groupedData}
            handleSelection={handleSelection}
          />
        </div>
      </div>
    </div>
  );
}

export default department;
