import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import { DepartmentType, uploadData } from "~/model/data/actions";
import { deleteTextWithName, getData } from "~/model/text";
import _ from "lodash";
import TextList from "~/route_component/admin/TextList";
import CSVSelector from "~/component/CsvUpload";
export const loader: LoaderFunction = async ({ request, params }) => {
  let department = params.department as DepartmentType;
  let text = await getData(department);
  let url = new URL(request.url);
  let session = url.searchParams.get("session");
  const groupedData = _.groupBy(text, "name");
  return { groupedData, department, session };
};

export const action: ActionFunction = async ({ request, params }) => {
  let formdata = await request.formData();

  switch (request.method) {
    case "DELETE": {
      let text_name = formdata.get("text_name") as string;
      let department = params.department as DepartmentType;
      let deleted = await deleteTextWithName(text_name, department);
      return deleted;
    }
    case "POST": {
      let data = formdata.get("data") as string;
      let filename = formdata.get("filename") as string;
      let department = formdata.get("department") as DepartmentType;
      let parsed_Data = JSON.parse(data);
      let paragraphs = parsed_Data.map((item) => item.paragraph);
      let status = await uploadData({
        name: filename,
        data: paragraphs,
        department,
      });
      return status;
    }
  }
};

function department() {
  const { groupedData, department } = useLoaderData();

  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 ">
      <div className="col-span-12 xl:col-span-8 ">
        <Outlet />
      </div>
      <div className="col-span-12 xl:col-span-4">
        <div className="shadow-md w-full">
          <CSVSelector department={department} />
          <h1 className="text-light text-gray-500">Texts</h1>
          <TextList department={department} groupedData={groupedData} />
        </div>
      </div>
    </div>
  );
}

export default department;
