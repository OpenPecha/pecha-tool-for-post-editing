import { atom } from "recoil";

export const sourceTextState = atom({
  key: "sourceText",
  default: "",
});

export const mitraTextState = atom({
  key: "mitraText2",
  default: null,
});

export const gptResultState = atom({
  key: "gptResultState",
  default: "",
});

export const finalTextState = atom({
  key: "finalText",
  default: "",
});

export const promptState = atom({
  key: "prompt",
  default: " in plain english",
});

export const activeTime = atom({
  key: "activeTime-en-bo",
  default: 0,
});
