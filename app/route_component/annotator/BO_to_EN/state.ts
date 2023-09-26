import { atom } from "recoil";

export const dictionaryState = atom({
  key: "dictionary-bo-en", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const mainTextState = atom({
  key: "mainText-bo-en",
  default: null,
});

export const mitraTextState = atom({
  key: "mitraText-bo-en",
  default: null,
});

export const activeTime = atom({
  key: "activeTime-bo-en",
  default: 0,
});
