export async function tokenizer(sentence: string) {
  let url = "/api/tokenizer/" + sentence;

  let res = await fetch(url);
  let data = await res.json();
  return data;
}
