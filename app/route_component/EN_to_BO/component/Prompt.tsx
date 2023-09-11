import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { promptState } from "../state";

function PromptView() {
  const [prompt, setPrompt] = useRecoilState(promptState);
  const inputRef = useRef<HTMLInputElement>(null);

  let prompt_start = "Rewrite the following text ";
  let default_prompt = " in plain english";
  function handleSubmit(e) {
    e.preventDefault();
    let value =
      inputRef.current?.value === "" ? default_prompt : inputRef.current?.value;
    let newPrompt = prompt_start + " " + value;
    setPrompt(newPrompt);
  }
  function adjustInputWidth() {
    const content = inputRef.current?.value;
    const contentLength = content?.length;
    const minWidth = 50; // Optional: You can set your desired minimum width
    // Calculate the width based on content length (you can adjust this formula as needed)
    const newWidth = Math.max(contentLength! * 8, minWidth);
    if (inputRef.current) {
      inputRef.current.style.width = newWidth + "px";
    }
  }

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-2 mt-2 items-center">
        <img src="/asset/ChatGPT.png" width={20} height={20} />
        <label
          htmlFor="prompt_1"
          className="w-auto md:w-fit"
          style={{ fontSize: "clamp(15px,2vw,20px)" }}
        >
          {prompt_start}{" "}
        </label>
        <div className="flex-1 join">
          <input
            ref={inputRef}
            id="prompt_1"
            placeholder={default_prompt}
            className="w-full join-item flex-1 border border-gray-300 rounded-md p-2"
            onInput={adjustInputWidth}
          />
          <button
            type="submit"
            disabled={prompt.length < 1}
            className=" join-item bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Enter
          </button>
        </div>
      </div>
    </form>
  );
}

export default PromptView;
