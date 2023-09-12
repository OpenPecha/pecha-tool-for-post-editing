import { ActionFunction } from "@remix-run/node";
import { DepartmentType } from "~/model/data/actions";
import { updateTranscriber } from "~/model/text";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let action = formData.get("action") as string;
  let department = formData.get("department") as DepartmentType;

  if (request.method === "PATCH") {
    if (action === "change_transcriber") {
      let name = formData.get("text_name") as string;
      let transcriber = formData.get("transcriber") as string;
      let res = await updateTranscriber(name, transcriber, department);
      return res;
    }
  }
  if (history) {
  }
  return null;
};
