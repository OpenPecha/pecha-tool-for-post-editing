import { atom } from "recoil";

export const sourceTextState = atom({
  key: "sourceText-en-bo",
  default: "",
});

export const mitraTextState = atom({
  key: "mitraText2-en-bo",
  default: null,
});

export const gptResultState = atom({
  key: "gptResultState-en-bo",
  default: "",
});

export const finalTextState = atom({
  key: "finalText-en-bo",
  default: "",
});

export const promptState = atom({
  key: "prompt-en-bo",
  default: " in plain english",
});

export const activeTime = atom({
  key: "activeTime-en-bo",
  default: 0,
});
