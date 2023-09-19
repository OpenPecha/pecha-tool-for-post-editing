import { atom } from "recoil";

export const dictionaryState = atom({
  key: "dictionary", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const mainTextState = atom({
  key: "mainText",
  default: null,
});

export const mitraTextState = atom({
  key: "mitraText",
  default: null,
});
