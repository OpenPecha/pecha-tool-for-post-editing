import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import globalStyle from "~/style/global.css";
import { RecoilRoot } from "recoil";
import tailwindStyle from "~/style/tailwind.css";
import { createUserIfNotExists } from "./model/user";
import { Toaster } from "~/components/ui/toaster";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyle },
  { rel: "stylesheet", href: globalStyle },
];

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session") as string;
  let user = session ? await createUserIfNotExists(session) : null;
  return { user };
};

export default function App() {
  const { user } = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RecoilRoot>
          <Outlet context={user} />
        </RecoilRoot>
        <Toaster />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
