import { useSetRecoilState } from "recoil";
import { dictionaryState } from "~/route_component/BO_to_EN/state";

export type Dictionary = {
  word: string;
  definition: string;
};
export type DictionaryViewType = {
  data: Dictionary[];
};

function DictionaryView({ data }: DictionaryViewType) {
  return (
    <>
      <div className=" box-title bg-blue-200 flex justify-between px-2">
        Dictionary <button>save</button>
      </div>
      <div className="px-2 flex flex-wrap">
        {data.map(({ word, definition }, index) => {
          return (
            <div key={word + index}>
              {word}
              <Definition word={word} definition={definition} />
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
}: {
  word: string;
  definition: string;
}) {
  const setDictionary = useSetRecoilState(dictionaryState);
  function handleInput(e) {
    setDictionary((prev) => ({
      ...prev,
      [word]: e.target.innerText,
    }));
  }
  return (
    <span
      contentEditable
      suppressContentEditableWarning
      className="mx-1 px-1 border-2 border-gray-200 rounded "
      onInput={handleInput}
    >
      {definition}
    </span>
  );
}

export default DictionaryView;
