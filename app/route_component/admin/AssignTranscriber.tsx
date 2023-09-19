import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
function AssignTranscriber({ transcriber, name }: any) {
  let { users, department } = useLoaderData();
  let fetcher = useFetcher();
  let options = users.map((user) => ({
    label: user.username,
    value: user.username,
  }));
  let value = transcriber?.username
    ? {
        value: transcriber?.username,
        label: transcriber?.username,
      }
    : null;
  function handleDelete() {
    fetcher.submit(
      {
        text_name: name,
        transcriber: "",
        department,
        action: "change_transcriber",
      },
      {
        method: "PATCH",
      }
    );
  }

  function handleChange(data: any) {
    let transcriber = data;
    fetcher.submit(
      {
        text_name: name,
        transcriber,
        action: "change_transcriber",
        department,
      },
      {
        method: "PATCH",
      }
    );
  }
  return (
    <div className="flex gap-2 w-full md:w-[50%] mb-3 z-30">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-full h-6">
          <SelectValue placeholder={value?.value} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            return (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <div className="flex items-center cursor-pointer" onClick={handleDelete}>
        <AiFillDelete />
      </div>
    </div>
  );
}

export default AssignTranscriber;
