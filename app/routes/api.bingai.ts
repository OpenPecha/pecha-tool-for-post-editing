import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { bingTranslate } from "~/api";

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let text = formData.get("text") as string;
  let language = formData.get("language") as string;
  let key = process.env.BING_TRANSLATE_API_KEY!;
  let from = "en";
  let to = "bo";
  if (language === "bo-en") {
    from = "bo";
    to = "en";
  }
  let result = await bingTranslate(text, from, to, key);
  return { result };
};
