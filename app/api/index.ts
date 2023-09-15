import { convertToJSON } from "~/lib/convertToJSON";
import { OpenAIApi, Configuration } from "openai";
import { v4 as uuidv4 } from "uuid";
export type languageType = "en-bo" | "bo-en";
export const fetchDharmaMitraData = async (
  sentence: string,
  language: languageType
) => {
  console.log(sentence, language);
  const apiUrl = "https://dharmamitra.org/api/translation/";
  const requestData = {
    input_sentence: sentence,
    level_of_explanation: 0,
    language: language,
    model: "NO",
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    let res = await response.text();
    let data = convertToJSON(res);
    return data;
  } catch (e) {
    throw new Error(e + "Error in DharmaMitra API");
  }
};

export const fetchGPTData = async (sentence: string) => {
  let prompt = sentence;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages: [{ role: "user", content: prompt }],
      // prompt,
      temperature: 0.5,
      max_tokens: 1500,
    });
    return result.data.choices[0].message?.content;
  } catch (e) {
    console.log("error", e.response.data);
  }
  return "";
};

export const fetchDictionary = async (word: string) => {
  let url =
    "https://api.padma.io/dictionary_lookup?query=" +
    word +
    "&matching=exact&dictionaries=erik_pema_kunsang,jeffrey_hopkins,jim_welby&tokenize=false&mode=api";
};

export const bingTranslate = async (
  text: string,
  from_lang: string,
  to_lang: string,
  key: string
) => {
  const baseURL = "https://api.cognitive.microsofttranslator.com";
  const apiURL = "/translate";
  const url = new URL(apiURL, baseURL);

  const queryParams = {
    "api-version": "3.0",
    from: from_lang,
    to: [to_lang],
  };

  url.search = new URLSearchParams(queryParams).toString();

  const headers = {
    "Ocp-Apim-Subscription-Key": key,
    "Ocp-Apim-Subscription-Region": "eastus",
    "Content-Type": "application/json",
    "X-ClientTraceId": uuidv4().toString(),
  };

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify([{ text }]),
    responseType: "json",
  };
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    let res = data[0].translations[0].text;
    return res;
  } catch (error) {
    console.error("Error in translation API: ", error);
  }
};
