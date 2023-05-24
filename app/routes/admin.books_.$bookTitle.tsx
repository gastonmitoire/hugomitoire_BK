import { useState, useEffect, useRef } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";

import { db } from "~/utils/db.server";

import { BookDetails } from "~/components/book_details";
import { BookHero } from "~/components/book_hero";
import { Button } from "~/components/button";
import { ChapterList } from "~/components/chapter_list";
import { ChapterForm } from "~/components/chapter_form";
import { Header } from "~/components/header";
import { List } from "~/components/list";

export const action = async ({ request, params }: LoaderArgs) => {
  if (request.method === "DELETE") {
    const formatedTitle = params.bookTitle?.replace(/_/g, " ");
    const book = await db.book.findUnique({
      where: { title: formatedTitle },
    });
    if (!book) {
      return json(
        { message: `No book found with the title ${params.bookTitle}` },
        { status: 404 }
      );
    }

    await db.book.delete({ where: { title: book.title } });
    return json({ message: `Book ${params.bookTitle} deleted` });
  }
};

export const loader = async ({ params }: LoaderArgs) => {
  const formatedTitle = params.bookTitle?.replace(/_/g, " ");
  const book = await db.book.findUnique({
    where: { title: formatedTitle },
    include: {
      genre: true,
      comments: true,
    },
  });

  if (!book) {
    return json(
      { message: `No book found with the title ${params.bookTitle}` },
      { status: 404 }
    );
  }

  const chapters = await db.chapter.findMany({
    where: { bookId: book.id },
    orderBy: { order: "desc" },
  });

  return json({ book, chapters });
};

export default function AdminBookByTitleRoute() {
  const { book, chapters } = useLoaderData();
  const [createChapter, setCreateChapter] = useState(false);

  const handleChapterClick = (item: string) => {
    console.log(item);
  };

  const toggleCreateChapter = () => {
    setCreateChapter((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <nav
        aria-label="Admin book menu"
        className="col-span-2 rounded-lg border-2 border-neutral-800"
      >
        <ul className="flex items-center justify-between p-5"></ul>
      </nav>

      <div className="col-span-1">
        <BookHero book={book} />
      </div>

      <div className="col-span-1 grid gap-3">
        <button
          className="w-full py-3 bg-neutral-700 bg-opacity-10 hover:bg-opacity-20"
          onClick={toggleCreateChapter}
        >
          {createChapter ? "Cancelar" : "Crear capítulo"}
        </button>
        {createChapter ? <ChapterForm bookId={book.id} /> : null}
        <List
          height={370}
          items={chapters.map(
            (chapter: any) => chapter.order + " | " + chapter.title
          )}
          clickHandler={handleChapterClick}
        />
      </div>
    </div>
  );
}
