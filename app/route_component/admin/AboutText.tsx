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
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function AboutText() {
  let { texts, filename } = useLoaderData();
  if (texts.length === 0) return <div>no texts</div>;
  return (
    <>
      <AssignTranscriber
        transcriber={texts?.at(0)?.transcriber}
        name={filename}
      />
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-wrap gap-2 overflow-hidden">
        <Outlet />
        <WorkList />
      </div>
    </>
  );
}

function WorkList() {
  let { texts, filename, department, session } = useLoaderData();

  const Row = ({ index, style }) => {
    let text = texts[index];
    let textId = text?.translated ? text.id : "";
    let url = `/admin/text/${department}/${filename}/${textId}?session=${session}`;
    return (
      <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
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
      </div>
    );
  };

  return (
    <Table className="h-full overflow-hidden ">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-xs">Id</TableHead>
          <TableHead className="text-xs">Source</TableHead>
          <TableHead className="text-right text-xs">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-[58vh]">
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height}
              itemCount={texts?.length}
              itemSize={35}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </TableBody>
    </Table>
  );
}

export default AboutText;
