import { ActionFunction } from "@remix-run/node";
import { DepartmentType, uploadData } from "~/model/data/actions";

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let data = formdata.get("data") as string;
  let name = formdata.get("name") as string;
  let department = formdata.get("department") as DepartmentType;
  let parsed_Data = JSON.parse(data);
  let paragraphs = parsed_Data.map((item) => item.paragraph);
  if (request.method === "POST") {
    let status = await uploadData({ name, data: paragraphs, department });
    return status;
  }
  return null;
};
