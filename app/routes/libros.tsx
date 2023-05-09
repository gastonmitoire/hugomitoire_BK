import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";

import { Book } from ".prisma/client";
import { db } from "~/utils/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  const bookListItems = await db.book.findMany({
    include: {
      chapters: true,
      genre: true,
      comments: true,
    },
  });

  return json({ bookListItems });
};

export default function Libros() {
  const data = useLoaderData<typeof loader>();
  const bookListItems = data.bookListItems;

  return (
    <div className="container mx-auto h-[90vh] py-3">
      <Outlet />
    </div>
  );
}
