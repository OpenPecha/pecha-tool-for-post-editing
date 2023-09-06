export type Dictionary = {
  word: string;
  definition: string;
};
export type DictionaryViewType = {
  data: Dictionary[];
  setDictionary: (data: {}) => void;
};

function DictionaryView({ data, setDictionary }: DictionaryViewType) {
  return (
    <>
      <div className=" box-title bg-blue-200 flex justify-between px-2">
        Dictionary <button>save</button>
      </div>
      <div className="px-2 flex flex-wrap">
        {data.map(({ word, definition }, index) => {
          return (
            <div>
              {word}
              <Definition
                word={word}
                definition={definition}
                setDictionary={setDictionary}
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
  setDictionary,
  word,
}: {
  word: string;
  definition: string;
  setDictionary: (data: {}) => void;
}) {
  function handleInput(e) {
    console.log(e.target.innerText, "save to database");
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
