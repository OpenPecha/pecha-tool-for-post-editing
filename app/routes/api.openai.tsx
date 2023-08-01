import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { fetchGPTData } from "~/api";

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let prompt = formData.get("prompt") as string;
  let result = await fetchGPTData(prompt);

  return { result };
};
