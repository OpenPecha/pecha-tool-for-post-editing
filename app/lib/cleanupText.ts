export function cleanUpSymbols(text: string | null) {
  if (!text) return null;
  // Define the set of symbols you want to clean up from the text
  const symbolsToCleanUp = /[:'"()\[\]\-_=+*^$#@~`]/g;

  // Remove symbols from the beginning of the text
  let cleanedText = text.replace(symbolsToCleanUp, (match) => {
    if (match === ":") {
      return ""; // Remove the colon only from the beginning
    }
    return match;
  });

  // Remove symbols from the end of the text
  cleanedText = cleanedText.replace(symbolsToCleanUp, "");

  return cleanedText.trim();
}
