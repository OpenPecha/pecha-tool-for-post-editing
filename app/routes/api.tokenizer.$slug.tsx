import { LoaderFunction, json } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request, params }) => {
  let sentence = params.slug as string;

  let url = "https://dakje.io/api/tokenize";
  let body = JSON.stringify({
    content: sentence,
  });
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type based on your API requirements
    },
    body,
  });
  let data = await res.json();
  let words: [] = data.words;

  return json(words);
};
