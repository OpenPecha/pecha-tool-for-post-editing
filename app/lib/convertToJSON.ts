export function convertToJSON(str: string) {
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

  return obj;
}
