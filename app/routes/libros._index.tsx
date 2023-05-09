import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";

import { Book } from ".prisma/client";
import { db } from "~/utils/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  const bookListItems = await db.book.findMany({
    select: {
      id: true,
      title: true,
      cover: true,
    },
  });

  return json({ bookListItems });
};

export default function LibrosIndex() {
  const data = useLoaderData<typeof loader>();
  const bookListItems = data.bookListItems;
  return (
    <div className="grid grid-cols-5 gap-3">
      {bookListItems.map(({ cover, title }, index) => (
        <img
          key={index}
          src={cover}
          alt={title}
          className="w-full h-full object-cover"
        />
      ))}
    </div>
  );
}
