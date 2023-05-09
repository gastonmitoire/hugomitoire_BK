import React from "react";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";

import { db } from "~/utils/db.server";

import { Chapter } from ".prisma/client";

export const loader = async ({ params }: LoaderArgs) => {
  const formatedTitle = params.bookTitle?.replace(/_/g, " ");
  const book = await db.book.findUnique({
    where: { title: formatedTitle },
    include: { genre: true, chapters: true, comments: true },
  });

  if (!book) {
    return json(
      { message: `No book found with the title ${params.bookTitle}` },
      { status: 404 }
    );
  }

  return json(book);
};

export default function LibroRoute() {
  const data = useLoaderData();

  console.log(data);
  return (
    <div
      className="h-[90vh] w-full bg-cover bg-center py-3"
      style={{
        backgroundImage: `url(${data.secondaryImage})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto grid grid-cols-3 grid-rows-2 h-full w-full py-5 px-10 rounded-xl dark:bg-neutral-900 dark:bg-opacity-50">
        <div className="col-span-1 row-span-2 flex items-center">
          <img src={data.cover} alt={data.title} className="h-[75vh]" />
        </div>
        <div className="row-span-2">
          <ul>
            {data.chapters.map(({ id, title }: Chapter) => (
              <li key={id}>
                <Link to={`/libros/${data.title.replace(/ /g, "_")}/${id}`}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex flex-col justify-center items-end gap-1 h-full">
            <p className="text-xl font-bold text-white text-right font-bellefair py-1 px-3 rounded-xl dark:text-neutral-800 dark:bg-neutral-200 dark:bg-opacity-70">
              {data.description}
            </p>
            <span className="flex items-center gap-1 font-cinzel dark:text-neutral-300">
              <h5 className="italic uppercase">{data.type}</h5>|
              <strong className="lowercase">{data.genre.name}</strong>
            </span>
            <h1 className="text-3xl font-bold text-white text-right">
              {data.title}
            </h1>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
