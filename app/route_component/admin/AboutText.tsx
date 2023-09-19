import { useLoaderData, Outlet, Link } from "@remix-run/react";
import AssignTranscriber from "./AssignTranscriber";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ScrollArea } from "~/components/ui/scroll-area";
function AboutText() {
  let { texts, filename } = useLoaderData();
  if (texts.length === 0) return <div>no texts</div>;
  return (
    <>
      <AssignTranscriber
        transcriber={texts?.at(0)?.transcriber}
        name={filename}
      />
      <div className="flex flex-wrap gap-2 ">
        <Outlet />
        <ScrollArea className="h-[70vh] w-full rounded-md border p-4">
          <WorkList />
        </ScrollArea>
      </div>
    </>
  );
}

function WorkList() {
  let { texts, filename, department, session } = useLoaderData();
  return (
    <Table>
      <TableCaption>A list of your work.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-xs">Id</TableHead>
          <TableHead className="text-xs">Source</TableHead>
          <TableHead className="text-right text-xs">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {texts.map((text) => {
          let url =
            "/admin/text/" +
            department +
            "/" +
            filename +
            "/" +
            text.id +
            "?session=" +
            session;
          return (
            <TableRow key={text.id + "text"}>
              <TableCell>
                <Link to={url} className="text-xs">
                  {text.id}
                </Link>
              </TableCell>
              <TableCell className="max-w-[100px] truncate font-medium text-xs">
                {text.original_text}
              </TableCell>
              <TableCell className="text-right text-xs">
                {text.status || "pending"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default AboutText;
