import { ActionFunction, redirect } from "@remix-run/node";
import { DepartmentType } from "~/model/data/actions";
import { updateText } from "~/model/text";

const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let action = formData.get("action") as string;
  let department = formData.get("department") as DepartmentType;
  let headerUrl = request.headers.get("referer") as string;
  let url = new URL(headerUrl);
  let history = url.searchParams.get("history") as string;
  let session = url.searchParams.get("session") as string;
  if (request.method === "PATCH") {
    switch (action) {
      case "save_text": {
        let result = formData.get("result") as string;
        let user_id = formData.get("user_id") as string;
        let text_id = formData.get("id") as string;
        let duration = formData.get("duration") as string;
        let update = await updateText(
          text_id,
          user_id,
          result,
          department,
          duration
        );
        if (history) {
          return redirect(`/${department}/?session=${session}`);
        }
        return update;
      }
    }
  }

  return null;
};

export default action;
