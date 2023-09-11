import { LoaderFunction } from "@remix-run/node";
import { DepartmentType } from "~/model/data/actions";
import { getData } from "~/model/text";

export const loader: LoaderFunction = async ({ request, params }) => {
  let department = params.$department as DepartmentType;
  let text = await getData(department);
  if (!text) return null;
  return text;
};
