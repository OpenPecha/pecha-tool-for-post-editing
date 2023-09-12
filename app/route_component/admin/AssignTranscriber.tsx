import React from "react";
import { AiFillDelete } from "react-icons/ai";
import Select from "react-tailwindcss-select";
import { useFetcher, useLoaderData } from "@remix-run/react";
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
        action: "/api/text",
      }
    );
  }

  function handleChange(data: any) {
    let transcriber = data.value;
    fetcher.submit(
      {
        text_name: name,
        transcriber,
        action: "change_transcriber",
        department,
      },
      {
        method: "PATCH",
        action: "/api/text",
      }
    );
  }
  return (
    <div className="flex gap-2 w-[50%] mb-3 z-30">
      <Select
        isMultiple={false}
        value={value}
        primaryColor="green"
        onChange={handleChange}
        options={options}
        isSearchable
        placeholder="assign a translator"
        searchInputPlaceholder="search a translator"
        loading={fetcher.state !== "idle"}
      />
      <div className="flex items-center cursor-pointer" onClick={handleDelete}>
        <AiFillDelete />
      </div>
    </div>
  );
}

export default AssignTranscriber;
