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
  let words: [] = data.words.filter(
    (word) => word.pos !== "ADP" && word.pos !== "NO_POS" && word.pos !== "PART"
  );

  let dictionary = {};
  await Promise.all(
    words.map(async (word) => {
      let wordToSearch = word?.form;
      if (!dictionary[wordToSearch]) {
        let d = await searchDictionary(wordToSearch);
        dictionary[wordToSearch.trim()] = d;
      }
    })
  );
  return dictionary;
};

async function searchDictionary(word: string) {
  let url =
    "https://api.padma.io/dictionary_lookup?query=" +
    word +
    "&matching=exact&dictionaries=erik_pema_kunsang&tokenize=false&mode=api";

  let res = await fetch(url, {
    method: "GET",
  });
  let data = await res.json();
  let dictionary = data.text?.flat()?.join(",");
  return dictionary;
}
