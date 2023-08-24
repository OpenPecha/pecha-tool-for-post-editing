import { useEffect, useState, useMemo } from "react";
import { SaveButton, SaveButtonWithTick } from "~/component/SaveButton";
import Select from "react-tailwindcss-select";
type DictionaryProps = {
  setDictionary?: (data: string) => void;
  text: string;
};

function Dictionary({ setDictionary, text }: DictionaryProps) {
  const [data, setUpdatedDictionary] = useState<null | string[]>(null);
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [selectedWord, setSelectedWord] = useState<null | string>(null);
  const [selectValue, setSelectValue] = useState<[]>([]);
  useEffect(() => {
    async function fetcherdata() {
      let url = "/api/dictionary/" + text;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setUpdatedDictionary(data);
        });
    }
    if (text) fetcherdata();
  }, [text]);

  const handleChange = (key: string, newValue: string) => {
    setUpdatedDictionary((prev) => {
      return { ...prev, [key]: newValue };
    });
    setIsContentChanged(true);
  };
  const handleSave = () => {
    let finalDictionary = {};
    selectValue?.forEach(({ value }) => {
      finalDictionary[value] = data[value];
    });
    setDictionary(JSON.stringify(finalDictionary) || "");
    setIsContentChanged(false);
  };
  const handleWordClick = (word: string) => {
    setSelectedWord(word);
  };
  const handleSelectChange = (value: any) => {
    setSelectValue(value);
    setIsContentChanged(true);
    setSelectedWord(null);
  };
  let options = useMemo(() => {
    if (data)
      return (
        Object.keys(data)?.map((key) => {
          return { label: key, value: key };
        }) || []
      );
    return [];
  }, [data]);
  return (
    <div className="dictionary-container flex-1 overflow-hidden mt-2 border-2 border-gray-400 shadow-sm">
      <div className="flex items-center justify-between p-2 w-full">
        <h2>Dictionary</h2>
        <button onClick={handleSave}>
          {isContentChanged ? <SaveButton /> : <SaveButtonWithTick />}
        </button>
      </div>
      <Select
        primaryColor="green"
        value={selectValue}
        onChange={handleSelectChange}
        options={options}
        isMultiple
        isSearchable
      />
      <div className="flex gap-2 p-2">
        <div className="flex flex-col gap-2 mt-2 w-fit">
          {selectValue?.length > 0 &&
            selectValue.map(({ value: key }) => (
              <div key={key} onClick={() => handleWordClick(key)}>
                <div
                  className={`shadow-sm cursor-pointer px-1 ${
                    selectedWord === key ? "bg-yellow-400" : ""
                  }`}
                >
                  <span>{key}</span>
                </div>
              </div>
            ))}
        </div>
        {selectedWord ? (
          <div className="selected-word-meaning w-full mt-2 p-2">
            <textarea
              className="text-[15px] w-full h-full bg-white overflow-hidden"
              rows={10}
              onChange={(e) => handleChange(selectedWord, e.target.value)}
              value={data[selectedWord] || ""}
              autoFocus={true}
            />
          </div>
        ) : (
          <div className="font-light text-gray-300">
            select a word to modify its meaning
          </div>
        )}
      </div>
    </div>
  );
}

export default Dictionary;
