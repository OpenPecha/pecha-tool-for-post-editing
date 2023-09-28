import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CardDescription } from "~/components/ui/card";
import { dictionaryState } from "~/route_component/annotator/BO_to_EN/state";

export type Dictionary = {
  word: string;
  definition: string;
};
export type DictionaryViewType = {
  data: Dictionary[];
};

function DictionaryView({ data }: DictionaryViewType) {
  const [dictionary, setDictionary] = useRecoilState(dictionaryState);
  const [temp, setTemp] = useState({});

  function handleInput(e, word) {
    setTemp((prev) => ({
      ...prev,
      [word]: e.target.innerText,
    }));
  }

  function handleSubmit() {
    setDictionary((p) => ({ ...p, ...temp }));
  }
  return (
    <>
      <CardDescription className="  bg-blue-200 flex justify-between p-1">
        Dictionary <button onClick={handleSubmit}>generate</button>
      </CardDescription>
      <div className="px-2 flex flex-wrap">
        {data.map(({ word, definition }, index) => {
          return (
            <div key={word + index}>
              {word}
              <Definition
                word={word}
                definition={definition}
                handleInput={handleInput}
                dictionary={dictionary}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

function Definition({
  definition,
  word,
  handleInput,
  dictionary,
}: {
  word: string;
  definition: string;
  handleInput: (e, word) => void;
  dictionary: { [key: string]: string } | null;
}) {
  return (
    <span
      contentEditable
      suppressContentEditableWarning
      className="mx-1 px-1 border-2 border-gray-200 rounded "
      onInput={(e) => handleInput(e, word)}
    >
      {dictionary ? dictionary[word] : definition}
    </span>
  );
}

export default DictionaryView;
