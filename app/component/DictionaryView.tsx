import { useState } from "react";
import { useSetRecoilState } from "recoil";
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
  const setDictionary = useSetRecoilState(dictionaryState);
  const [temp, setTemp] = useState({});

  function handleInput(e, word) {
    setTemp((prev) => ({
      ...prev,
      [word]: e.target.innerText,
    }));
  }

  function handleSubmit() {
    console.log(temp);
    setDictionary((p) => ({ ...p, ...temp }));
  }
  return (
    <>
      <CardDescription className="  bg-blue-200 flex justify-between p-1">
        Dictionary <button onClick={handleSubmit}>save</button>
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
}: {
  word: string;
  definition: string;
  handleInput: (e, word) => void;
}) {
  return (
    <span
      contentEditable
      suppressContentEditableWarning
      className="mx-1 px-1 border-2 border-gray-200 rounded "
      onInput={(e) => handleInput(e, word)}
    >
      {definition}
    </span>
  );
}

export default DictionaryView;
