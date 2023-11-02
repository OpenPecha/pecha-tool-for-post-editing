import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetchers,
  useLoaderData,
} from "@remix-run/react";
import globalStyle from "~/style/global.css";
import { RecoilRoot } from "recoil";
import tailwindStyle from "~/style/tailwind.css";
import { createUserIfNotExists } from "./model/user";
import { Toaster } from "~/components/ui/toaster";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useNavigation } from "@remix-run/react";
import { useEffect, useMemo } from "react";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyle },
  { rel: "stylesheet", href: globalStyle },
  { rel: "stylesheet", href: nProgressStyles },
];

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let session = url.searchParams.get("session") as string;
  let user = session ? await createUserIfNotExists(session) : null;
  return { user };
};

export default function App() {
  const { user } = useLoaderData();
  let transition = useNavigation();

  let fetchers = useFetchers();
  let state = useMemo<"idle" | "loading">(
    function getGlobalState() {
      let states = [
        transition.state,
        ...fetchers.map((fetcher) => fetcher.state),
      ];
      if (states.every((state) => state === "idle")) return "idle";
      return "loading";
    },
    [transition.state, fetchers]
  );
  useEffect(() => {
    if (state === "loading") NProgress.start();
    if (state === "idle") NProgress.done();
  }, [transition.state]);
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
