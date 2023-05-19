import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
  useNavigate,
} from "@remix-run/react";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import { Button } from "~/components/button";
import { List } from "~/components/list";

export const loader = async ({ request, params }: LoaderArgs) => {
  const books = await db.book.findMany();
  return json({ books });
};

export default function AdminBooksRoute() {
  const navigate = useNavigate();
  const { books } = useLoaderData();

  const handleListClick = (item: string) => {
    navigate(`/admin/books/${item}`);
  };

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <h1 className="text-2xl font-bold">Libros</h1>
        <List
          items={books.map((book: any) => book.title)}
          height={370}
          className="overflow-y-auto py-3"
          clickHandler={handleListClick}
        />
      </div>
    </div>
  );
}
