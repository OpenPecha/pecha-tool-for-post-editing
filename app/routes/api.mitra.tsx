import { LoaderFunction, json } from "@remix-run/node";
import { fetchDharmaMitraData, languageType } from "~/api";

export const loader: LoaderFunction = async ({ request, params }) => {
  let url = new URL(request.url);
  let sentence = url.searchParams.get("sentence") as string;
  let language = url.searchParams.get("language") as languageType;
  console.log(sentence, language);
  let res = await fetchDharmaMitraData(sentence, language);
  console.log(res);
  return json({ data: res });
};
