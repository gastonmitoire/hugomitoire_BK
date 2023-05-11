import type {
  LinksFunction,
  V2_MetaFunction,
  LoaderArgs,
} from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  Outlet,
  ScrollRestoration,
  useRouteError,
  LiveReload,
} from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import stylesheet from "./tailwind.css";
import globalStylesheet from "~/styles/global.css";

import { Breadcrumbs } from "~/components/breadcrumbs";
import { Document } from "~/components/document";
import { Header } from "~/components/header";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: globalStylesheet },
];

export const meta: V2_MetaFunction = () => {
  const description = "Libros del escritor argentino Hugo Mitoire";

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "Hugo Mitoire - Libros" },
  ];
};

export default function App() {
  const { pathname } = useLocation();
  return (
    <Document>
      <Header />
      <Outlet />

      <LiveReload />
      <ScrollRestoration />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <div className="grid place-items-center h-screen">
          <span className="grid place-items-center">
            <h1 className="text-3xl font-bold uppercase text-red-700">
              {error.status} {error.statusText}
            </h1>
            <Link
              to="/"
              className="flex justify-center gap-3 text-neutral-700 dark:text-neutral-300"
            >
              Home
            </Link>
          </span>
        </div>
      </Document>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <Document title="Uh-oh!">
      <div className="grid place-items-center h-screen">
        <div className="bg-red-500">
          <h1>App Error</h1>
          <pre>{errorMessage}</pre>
        </div>
      </div>
    </Document>
  );
}
