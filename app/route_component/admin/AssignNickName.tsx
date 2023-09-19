import { useFetcher } from "@remix-run/react";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { memo } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
function AssignNickName({ user }: { user: any }) {
  const fetcher = useFetcher();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  function handleSubmit() {
    let value = inputRef.current?.value;
    if (!value) return;
    fetcher.submit(
      {
        id: user.id,
        nickname: value,
        action: "change_nickname",
      },
      {
        method: "POST",
      }
    );
    setOpenEdit(false);
  }

  return (
    <>
      {!openEdit ? (
        <div className="flex gap-3">
          {fetcher?.formData?.get("nickname") || user.nickname}
          <button onClick={() => setOpenEdit(true)} title="edit">
            <FiEdit2 />
          </button>
        </div>
      ) : (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            defaultValue={user.nickname!}
            name="nickname"
            ref={inputRef}
          />
          <Button type="button" variant="outline" onClick={handleSubmit}>
            <TiTick color="green" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpenEdit(false)}
          >
            <ImCross color="red" />
          </Button>
        </div>
      )}
    </>
  );
}

export default memo(AssignNickName);
