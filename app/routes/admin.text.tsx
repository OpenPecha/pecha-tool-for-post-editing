import { LoaderFunction, V2_MetaFunction, redirect } from "@remix-run/node";
import { useState } from "react";
import { useOutletContext, Outlet } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session");
  if (!session) return redirect("/error");

  return null;
};

export const meta: V2_MetaFunction = () => {
  return [
    { title: `Admin page ` },
    {
      name: "description",
      content: `admin page for `,
    },
  ];
};

function Index() {
  const user = useOutletContext();
  return <Outlet />;
}

export default Index;
