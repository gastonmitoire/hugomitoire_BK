// outlet for admin/books with typescript

import React from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";

import { db } from "~/utils/db.server";

import { Book } from "@prisma/client";

export const loader = async () => {
  return {
    books: await db.book.findMany(),
  };
};

export default function BooksRoute() {
  const books = useLoaderData() as Book[];

  return (
    <div>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">
          Libros {books.length > 0 ? `(${books.length})` : null}
        </h1>
        <nav>
          <Link
            to="new"
            className="inline-block px-4 py-2 text-white bg-secondary rounded hover:brightness-75"
          >
            Crear libro
          </Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
