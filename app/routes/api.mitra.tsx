import { LoaderFunction, json } from "@remix-run/node";
import { fetchDharmaMitraData, languageType } from "~/api";

export const loader: LoaderFunction = async ({ request, params }) => {
  let url = new URL(request.url);
  let sentence = url.searchParams.get("sentence") as string;
  let language = url.searchParams.get("language") as languageType;
  let res = await fetchDharmaMitraData(sentence, language);
  return json({ data: res });
};
