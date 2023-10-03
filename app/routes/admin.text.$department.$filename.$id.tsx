import { ActionFunction, LoaderFunction, defer, json } from "@remix-run/node";
import { DepartmentType } from "~/model/data/actions";
import { getText, rejectText } from "~/model/text";
import { useLoaderData, useFetcher, useNavigate } from "@remix-run/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";

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

  return null;
};

export default function AboutOneText() {
  const { text } = useLoaderData();
  let navigate = useNavigate();
  let fetcher = useFetcher();
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
  return (
    <Dialog open={true} onOpenChange={goBack}>
      <DialogContent>
        <ScrollArea className="h-[50dvh]">
          <DialogHeader>
            <DialogTitle>Source:</DialogTitle>
            <DialogDescription>
              <p className=" text-sm ">{text.original_text}</p>
            </DialogDescription>
            <DialogTitle>Translated:</DialogTitle>
            <DialogDescription>
              <p className=" text-sm">{text.translated}</p>
            </DialogDescription>
          </DialogHeader>
        </ScrollArea>
        <Button className="bg-red-300 hover:bg-red-400" onClick={reject}>
          reject
        </Button>
      </DialogContent>
    </Dialog>
  );
}
