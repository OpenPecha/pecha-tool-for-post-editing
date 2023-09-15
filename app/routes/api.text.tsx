import { ActionFunction, redirect } from "@remix-run/node";
import { DepartmentType } from "~/model/data/actions";
import { updateText, updateTranscriber } from "~/model/text";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let action = formData.get("action") as string;
  let department = formData.get("department") as DepartmentType;
  let headerUrl = request.headers.get("referer") as string;
  let url = new URL(headerUrl);
  let session = url.searchParams.get("session") as string;
  let history = url.searchParams.get("history") as string;

  let res;
  if (request.method === "PATCH") {
    if (action === "change_transcriber") {
      let name = formData.get("text_name") as string;
      let transcriber = formData.get("transcriber") as string;
      res = await updateTranscriber(name, transcriber, department);
    }
    if (action === "save_text") {
      let result = formData.get("result") as string;
      let user_id = formData.get("user_id") as string;
      let text_id = formData.get("id") as string;
      res = await updateText(text_id, user_id, result, department);
    }
  }
  if (history) {
    return redirect(`/${department}/?session=${session}`);
  }
  return res;
};
