import { ActionFunction, LoaderFunction, defer, json } from "@remix-run/node";
import { DepartmentType } from "~/model/data/actions";
import { getText, rejectText, updateTextFromReviewer } from "~/model/text";
import { useLoaderData, useFetcher, useNavigate } from "@remix-run/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

export const loader: LoaderFunction = async ({ request, params }) => {
  let department = params.department as DepartmentType;
  let text = await getText(department, parseInt(params?.id!));
  return json({ text });
};

export const action: ActionFunction = async ({ request, params }) => {
  let formdata = await request.formData();
  let action = formdata.get("action") as string;
  let id = formdata.get("id") as string;
  let department = params.department as DepartmentType;

  if (action === "reject") {
    return rejectText(id, department);
  }
  if (action === "update") {
    let content = formdata.get("content") as string;
    return await updateTextFromReviewer(id, department, content);
  }

  return null;
};

export default function AboutOneText() {
  const { text } = useLoaderData();
  let navigate = useNavigate();
  let fetcher = useFetcher();
  const [edit, setEdit] = useState(false);
  const [updateText, setUpdateText] = useState(text.translated);
  const goBack = (e) => {
    if (e === false) {
      navigate(-1);
    }
  };
  function reject() {
    fetcher.submit(
      {
        id: text.id,
        action: "reject",
      },
      {
        method: "PATCH",
      }
    );
    goBack(false);
  }
  function update() {
    fetcher.submit(
      {
        id: text.id,
        content: updateText,
        action: "update",
      },
      {
        method: "PATCH",
      }
    );
    goBack(false);
  }
  return (
    <Dialog open={true} onOpenChange={goBack}>
      <DialogContent className="flex flex-col h-[60dvh]">
        <ScrollArea className="flex-1">
          <DialogTitle className="mb-4">Source:</DialogTitle>
          <DialogDescription>
            <p className=" text-sm ">{text.original_text}</p>
          </DialogDescription>
        </ScrollArea>
        <ScrollArea className="flex-1">
          <div className="flex justify-between">
            <DialogTitle>Translated:</DialogTitle>
            <button
              onClick={() => {
                setEdit(true);
              }}
              title="edit"
            >
              <FiEdit2 />
            </button>
          </div>
          {edit ? (
            <textarea
              className="w-full h-full"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
            />
          ) : (
            <DialogDescription>
              <p className=" text-sm">{text.translated}</p>
            </DialogDescription>
          )}
        </ScrollArea>
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <Button className="bg-blue-400 hover:bg-blue-300" onClick={update}>
            update
          </Button>
          <Button className="bg-red-400 hover:bg-red-300" onClick={reject}>
            reject
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
