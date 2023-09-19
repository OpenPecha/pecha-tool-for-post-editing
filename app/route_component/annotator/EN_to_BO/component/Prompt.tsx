import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { promptState } from "../state";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

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

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-2 mt-2 items-center w-full">
        <img src="/asset/ChatGPT.png" width={20} height={20} />
        <label
          htmlFor="prompt_1"
          className="w-auto md:w-fit"
          style={{ fontSize: "clamp(15px,2vw,20px)" }}
        >
          {prompt_start}{" "}
        </label>
        <div className="flex  flex-1 w-full  items-center space-x-2">
          <Input
            ref={inputRef}
            id="prompt_1"
            placeholder={default_prompt}
            className="w-full  flex-1 border border-gray-300 rounded-md p-2"
          />
          <Button type="submit" disabled={prompt.length < 1}>
            Enter
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PromptView;
