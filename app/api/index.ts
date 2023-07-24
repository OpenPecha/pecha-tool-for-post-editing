export const fetchDharmaMitraData = async (sentence: string) => {
  const apiUrl = "https://dharmamitra.org/api/translation/";
  const requestData = {
    input_sentence: sentence,
    level_of_explanation: 0,
    language: "bo-en",
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
    return stringify(res);
  } catch (e) {
    console.log(e);
  }
};

function stringify(str: string) {
  // Split the string into an array by newline
  let parts = str.split("\n");

  // Create an empty object to store the data
  let obj = {};

  // Loop through each part
  for (let part of parts) {
    // Split each part by ': '
    let [key, value] = part.split(": ");
    // If key and value both exist, add to object
    if (key && value) {
      obj[key] = value.replace(/"/g, ""); // Remove quote marks
    }
  }

  return JSON.stringify(obj);
}
