import { LoaderFunction, defer, json } from "@remix-run/node";
import { DepartmentType } from "~/model/data/actions";
import { getText } from "~/model/text";
import { useLoaderData, useNavigation, useNavigate } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";

export const loader: LoaderFunction = async ({ request, params }) => {
  let department = params.department as DepartmentType;
  let text = await getText(department, parseInt(params?.id!));
  return json({ text });
};

export default function AboutOneText() {
  const { text } = useLoaderData();
  let navigate = useNavigate();
  const goBack = (e) => {
    if (e === false) {
      navigate(-1);
    }
  };
  return (
    <Dialog open={true} onOpenChange={goBack}>
      <DialogContent>
        <ScrollArea className="h-[50dvh]">
          <DialogHeader>
            <DialogTitle>source:</DialogTitle>
            <DialogDescription>
              <p className=" text-sm ">{text.original_text}</p>
            </DialogDescription>
            <DialogTitle>translated:</DialogTitle>
            <DialogDescription>
              <p className=" text-sm">{text.translated}</p>
            </DialogDescription>
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
