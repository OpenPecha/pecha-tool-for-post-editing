import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { fetchDharmaMitraData, languageType } from "~/api";

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let sentence = formdata.get("sentence") as string;
  let language = formdata.get("language") as languageType;
  let res = null;
  res = await fetchDharmaMitraData(sentence, language);
  return json({ data: res?.data, error: res?.error });
};
