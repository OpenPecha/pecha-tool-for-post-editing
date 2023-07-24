export const fetchDharmaMitraData = async (sentence: string) => {
  const apiUrl = "https://dharmamitra.org/api/translation/";
  const requestData = {
    input_sentence: sentence,
    level_of_explanation: 0,
    language: "bo-en",
    model: "NO",
  };
  const response = await fetch(apiUrl, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });
  const data = await response.json();
  return data;
};
