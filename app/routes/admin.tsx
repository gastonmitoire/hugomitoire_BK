import type {
  LinksFunction,
  V2_MetaFunction,
  LoaderArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useLocation } from "react-router";
import {
  isRouteErrorResponse,
  Link,
  Outlet,
  ScrollRestoration,
  useRouteError,
  LiveReload,
  useParams,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";
import { User } from ".prisma/client";

import { getUser } from "~/utils/session.server";
import { Header } from "~/components/header";

export const meta: V2_MetaFunction = () => {
  const description = "Libros del escritor argentino Hugo Mitoire";

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "Hugo Mitoire - Admin" },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);
  if (!user) {
    throw new Response(
      "Necesitás estar logueado con permisos de administrador para ver esta página",
      {
        status: 401,
      }
    );
  }
  //   if (user.role !== "ADMIN") {
  //     throw new Response("No tenés permisos para ver esta página", {
  //       status: 403,
  //     });
  //   }
  return json(user);
};

export default function AdminRoute() {
  const location = useLocation();
  const user = useLoaderData() as User;

  const adminRoutes = [
    {
      path: "usuarios",
    },
    {
      path: "libros",
    },
    {
      path: "imagenes",
    },
    {
      path: "capitulos",
    },
    {
      path: "fragmentos",
    },
    {
      path: "generos",
    },
  ];

  return (
    <div>
      <Header title="Admin Panel" />
      <nav className="flex justify-evenly gap-3 text-neutral-700 dark:text-neutral-300">
        {adminRoutes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={
              location.pathname.includes(route.path) ? "text-red-500" : ""
            }
          >
            {route.path}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 403 || error.status === 401) {
      return (
        <div className="grid place-items-center h-[90vh]">
          <div className="w-1/2 text-center px-5">
            <p className="font-body font-bold uppercase text-xl text-red-700">
              {error.data}
            </p>
            <nav>
              <Link
                to="/"
                className="flex justify-center gap-3 text-neutral-700 dark:text-neutral-300"
              >
                inicio
              </Link>
            </nav>
          </div>
        </div>
      );
    }
    if (error.status === 404) {
      return <div>Huh? What the heck is?</div>;
    }
  }

  return <div>There was an error loading joke by the id "$". Sorry.</div>;
}
